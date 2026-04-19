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

/** Type du contexte d'authentification */
type AuthContextType = {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: (urlRedirect?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provider pour gérer l'authentification */
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

/** Hook pour accéder au contexte d'auth */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth doit être utilisé à l’intérieur d’un AuthProvider.",
    );
  return context;
};
