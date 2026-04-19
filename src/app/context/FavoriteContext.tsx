/**
 * @module FavoriteContext
 * @description Contexte de gestion des favoris.
 * Synchronise les favoris entre le localStorage (visiteurs)
 * et l'API backend (utilisateurs connectés).
 */
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { FavoriteListItem } from "@/types/api-types";
import {
  addFavorite as addFavoriteService,
  removeFavorite as removeFavoriteService,
  listFavoritesForUser,
} from "@/services/favorites";

/**
 * Type du contexte des favoris.
 * Expose la liste des favoris et les actions d'ajout/suppression.
 */
type FavoriteContextType = {
  /** Liste des propriétés favorites */
  favorites: FavoriteListItem[];
  /** Indique si les favoris sont en cours de chargement */
  isLoading: boolean;
  /** Ajoute une propriété aux favoris */
  addFavorite: (fav: FavoriteListItem) => Promise<void>;
  /** Retire une propriété des favoris */
  removeFavorite: (propertyId: string) => Promise<void>;
  /** Recharge la liste des favoris */
  refreshFavorites: () => Promise<void>;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

/** Clé de stockage localStorage pour les favoris hors connexion */
const LOCAL_STORAGE_KEY = "favorites";

/**
 * Provider de gestion des favoris.
 * Utilise l'API si l'utilisateur est connecté, sinon le localStorage.
 * @param props.children - Composants enfants ayant accès au contexte
 */
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLocalFavorites = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setFavorites(JSON.parse(data));
    } else {
      setFavorites([]);
    }
    setIsLoading(false);
  };

  const saveLocalFavorites = (data: FavoriteListItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const fetchFavorites = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await listFavoritesForUser(user.id);
      setFavorites(res || []);
      saveLocalFavorites(res || []);
    } catch (error) {
      console.error("Erreur récupération favoris:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFavorites();
    } else {
      loadLocalFavorites();
    }
  }, [isAuthenticated, user]);

  const addFavorite = async (fav: FavoriteListItem) => {
    const exists = favorites.find((f) => f.id === fav.id);
    if (exists) return;

    if (isAuthenticated) {
      try {
        const res = await addFavoriteService(fav.id);
        if (!res.ok) throw new Error("API add favorite failed");
        const updated = [...favorites, fav];
        setFavorites(updated);
        saveLocalFavorites(updated);
      } catch (error) {
        console.error("Erreur ajout favori API:", error);
      }
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (isAuthenticated) {
      try {
        const res = await removeFavoriteService(propertyId);
        if (!res.ok) throw new Error("API remove favorite failed");
        const updated = favorites.filter((f) => f.id !== propertyId);
        setFavorites(updated);
        saveLocalFavorites(updated);
      } catch (error) {
        console.error("Erreur suppression favori API:", error);
      }
    }
  };

  const refreshFavorites = async () => {
    if (isAuthenticated) {
      await fetchFavorites();
    } else {
      loadLocalFavorites();
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

const defaultContext: FavoriteContextType = {
  favorites: [],
  isLoading: false,
  addFavorite: async () => {},
  removeFavorite: async () => {},
  refreshFavorites: async () => {},
};

/**
 * Hook pour accéder au contexte des favoris.
 * Retourne un contexte par défaut vide si utilisé en dehors du Provider.
 * @returns L'état des favoris et les actions disponibles
 */
export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  return context ?? defaultContext;
};
