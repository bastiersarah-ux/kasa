/**
 * @module ClientProviders
 * @description Wrapper regroupant tous les providers React côté client.
 * Encapsule NavigationProvider, NotificationProvider, AuthProvider et FavoriteProvider.
 */
"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { FavoriteProvider } from "@/app/context/FavoriteContext";
import { NavigationProvider } from "@/app/context/NavigationContext";
import { NotificationProvider } from "@/app/context/NotificationContext";

/**
 * Assemble tous les providers client de l'application.
 * Ordre d'imbrication : Navigation > Notification > Auth > Favorite.
 * @param props.children - Contenu de l'application
 * @returns L'arbre de providers
 */

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <NotificationProvider>
        <AuthProvider>
          <FavoriteProvider>{children}</FavoriteProvider>
        </AuthProvider>
      </NotificationProvider>
    </NavigationProvider>
  );
}
