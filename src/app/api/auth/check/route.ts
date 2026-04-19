/**
 * @module auth/check
 * @description Route API pour vérifier la présence d'un token d'authentification.
 * Utilisée pour un health-check rapide de l'état de connexion.
 */
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";

/**
 * Vérifie si un token d'authentification est présent dans les cookies.
 * @param request - Requête entrante
 * @returns JSON indiquant la présence ou non du token
 */

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  return NextResponse.json({
    hasToken: !!token,
    tokenExists: token ? true : false,
  });
}
