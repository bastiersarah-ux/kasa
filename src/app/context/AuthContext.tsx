/**
 * @module AuthContext
 * @description Contexte d'authentification de l'application.
 * Gère l'état de connexion, la vérification automatique au montage
 * et les actions login/logout/refresh.
 */
"use client";

import { AuthUser } from "@/types/api-types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Type du contexte d'authentification.
 * Expose l'utilisateur connecté, l'état de chargement
 * et les actions de connexion/déconnexion.
 */
type AuthContextType = {
  /** Utilisateur actuellement connecté (null si déconnecté) */
  user: AuthUser | null;
  /** Met à jour l'état de connexion avec les données utilisateur */
  login: (userData: AuthUser) => void;
  /** Déconnecte l'utilisateur et redirige vers l'URL spécifiée */
  logout: (urlRedirect?: string) => Promise<void>;
  /** Rafraîchit les données utilisateur depuis le serveur */
  refreshUser: () => Promise<void>;
  /** Indique si un utilisateur est connecté */
  isAuthenticated: boolean;
  /** Indique si la vérification initiale est en cours */
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider d'authentification.
 * Vérifie automatiquement l'état de connexion au montage en appelant `/api/auth/me`.
 * @param props.children - Composants enfants ayant accès au contexte
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasInitialized = useRef(false);

  // Récupère l'état d'auth au montage depuis le serveur
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const fetchAuthStatus = async () => {
      try {
        // Appeler le serveur pour vérifier si l'utilisateur est connecté
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          // Le serveur retourne { user: { ... } }
          if (data?.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          // 401 ou autre erreur = pas authentifié
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification d'authentification:",
          error,
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = async (urlRedirect?: string) => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setUser(null);
      router.push(urlRedirect ?? "/");
    }
  };

  const isAuthenticated = !!user;

  /** Rafraîchit les données utilisateur depuis le serveur */
  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du profil:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshUser, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook pour accéder au contexte d'authentification.
 * Doit être utilisé dans un composant enfant de `AuthProvider`.
 * @returns L'état d'authentification et les actions disponibles
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth doit être utilisé à l’intérieur d’un AuthProvider.",
    );
  return context;
};
