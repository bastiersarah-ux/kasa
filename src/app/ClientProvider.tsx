"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { NotificationProvider } from "@/app/context/NotificationContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  );
}
