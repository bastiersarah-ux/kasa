/**
 * @module auth/logout
 * @description Route API de déconnexion.
 * Supprime le cookie httpOnly contenant le token JWT.
 */
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";
import { NextResponse } from "next/server";

/**
 * Déconnecte l'utilisateur en supprimant le cookie d'authentification.
 * Le cookie est écrasé avec une valeur vide et un `maxAge` de 0.
 * @returns Confirmation de la déconnexion
 */

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
