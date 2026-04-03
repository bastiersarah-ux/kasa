"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { NotificationProvider } from "@/app/context/NotificationContext";
import AuthTemplate from "@/app/components/auth/AuthTemplate";

export default function LoginPage() {
  return <AuthTemplate isLogin={true} />;
}
