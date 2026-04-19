"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { FavoriteProvider } from "@/app/context/FavoriteContext";
import { NavigationProvider } from "@/app/context/NavigationContext";
import { NotificationProvider } from "@/app/context/NotificationContext";

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
