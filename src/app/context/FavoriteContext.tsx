"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { fetchAPI } from "src/services/fetch-api";
import { FavoriteListItem, FavoriteActionResponse } from "src/types/api-types";

type FavoriteContextType = {
  favorites: FavoriteListItem[];
  isLoading: boolean;
  addFavorite: (fav: FavoriteListItem) => Promise<void>;
  removeFavorite: (propertyId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

const LOCAL_STORAGE_KEY = "favorites";

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
      const res = await fetchAPI<FavoriteListItem[]>(
        `/api/users/${user.id}/favorites`,
      );
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
        const res: FavoriteActionResponse = await fetch(
          `/api/properties/${fav.id}/favorite`,
          {
            method: "POST",
          },
        ).then((r) => r.json());
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
        const res: FavoriteActionResponse = await fetch(
          `/api/properties/${propertyId}/favorite`,
          {
            method: "DELETE",
          },
        ).then((r) => r.json());
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

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorites doit être utilisé dans un FavoriteProvider");
  return context;
};
