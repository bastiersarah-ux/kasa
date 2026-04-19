/**
 * @module require-auth
 * @description Utilitaires d'authentification côté serveur.
 * Vérifient la présence du token JWT et extraient les données utilisateur.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";
import { decodeJWT } from "@/helpers/decode-jwt";

/**
 * Vérifie que l'utilisateur est authentifié côté serveur.
 * Redirige automatiquement vers `/auth/login` si aucun token n'est présent.
 * @returns Le token JWT de l'utilisateur connecté
 */
export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token) {
    redirect("/auth/login");
  }

  return token;
}

/**
 * Récupère l'identifiant de l'utilisateur connecté depuis le token JWT.
 * Redirige vers `/auth/login` si l'utilisateur n'est pas authentifié
 * ou si le token est invalide.
 * @returns L'identifiant numérique de l'utilisateur
 */
export async function getCurrentUserId(): Promise<number> {
  const token = await requireAuth();
  const payload = decodeJWT(token);

  if (!payload?.id) {
    redirect("/auth/login");
  }

  return payload.id;
}
