import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";
import { decodeJWT } from "@/helpers/decode-jwt";

/**
 * Vérifie que l'utilisateur est authentifié côté serveur
 * Redirige vers /auth/login si pas de token présent
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
 * Récupère l'ID utilisateur actuel depuis le JWT
 * Redirige vers /auth/login si pas authentifié
 */
export async function getCurrentUserId(): Promise<number> {
  const token = await requireAuth();
  const payload = decodeJWT(token);

  if (!payload?.id) {
    redirect("/auth/login");
  }

  return payload.id;
}
