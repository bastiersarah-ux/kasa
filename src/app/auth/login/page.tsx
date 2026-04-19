/**
 * @module LoginPage
 * @description Page de connexion de l'application.
 */
"use client";

import AuthTemplate from "@/app/components/auth/AuthTemplate";

/**
 * Page de connexion.
 * Utilise le template d'authentification en mode login.
 * @returns Le formulaire de connexion
 */

export default function LoginPage() {
  return <AuthTemplate isLogin={true} />;
}
