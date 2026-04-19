/**
 * @module NavigationContext
 * @description Contexte de suivi de la navigation.
 * Permet de savoir si l'utilisateur a un historique de navigation
 * dans l'application (pour afficher ou non un bouton "retour").
 */
"use client";

import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Type du contexte de navigation */
type NavigationContextType = {
  /** Indique si l'utilisateur a déjà visité une page précédente */
  hasPreviousRoute: boolean;
};

const NavigationContext = createContext<NavigationContextType>({
  hasPreviousRoute: false,
});

/**
 * Provider de suivi de la navigation.
 * Incrémente un compteur à chaque changement de route.
 * @param props.children - Composants enfants ayant accès au contexte
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const historyCount = useRef(0);

  useEffect(() => {
    historyCount.current++;
  }, [pathname]);

  return (
    <NavigationContext.Provider
      value={{ hasPreviousRoute: historyCount.current > 0 }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Hook pour accéder au contexte de navigation.
 * @returns L'état de navigation (présence d'un historique)
 */
export const useNavigation = () => useContext(NavigationContext);
