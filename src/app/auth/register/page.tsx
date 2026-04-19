/**
 * @module RegisterPage
 * @description Page d'inscription de l'application.
 */
"use client";

import AuthTemplate from "@/app/components/auth/AuthTemplate";

/**
 * Page d'inscription.
 * Utilise le template d'authentification en mode inscription.
 * @returns Le formulaire d'inscription
 */

export default function RegisterPage() {
  return <AuthTemplate isLogin={false} />;
}
