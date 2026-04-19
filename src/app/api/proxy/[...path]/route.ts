/**
 * @module proxy
 * @description Proxy API qui transfère les requêtes du client vers le backend.
 * Gère l'injection du token JWT depuis les cookies httpOnly,
 * le stockage automatique du token en cookie après connexion/inscription
 * et la suppression du cookie en cas de 401.
 */
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";
import { NextRequest, NextResponse } from "next/server";

/**
 * URL de l'API backend.
 * Configurable via la variable d'environnement `NEXT_PUBLIC_API_URL`.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Durée de vie du cookie d'authentification en secondes (24 heures) */
const COOKIE_MAX_AGE = 60 * 60 * 24;

/**
 * Transfère une requête vers le backend API.
 * - Retire le préfixe `/api/proxy` du chemin
 * - Ajoute le préfixe `/api` sauf pour les routes `/auth`
 * - Injecte le token JWT depuis les cookies
 * - Stocke le token reçu en cookie httpOnly après authentification
 * - Supprime le cookie en cas de réponse 401
 * @param req - Requête Next.js entrante
 * @returns Réponse du backend relayée au client
 */
async function forwardRequest(req: NextRequest) {
  // On retire le préfixe /api/proxy pour avoir le vrai chemin
  const path = req.nextUrl.pathname.replace(/^\/api\/proxy/, "");
  // Les routes /auth sont montées à la racine du backend, les autres sous /api
  const prefix = path.startsWith("/auth") ? "" : "/api";
  const targetUrl = `${API_URL}${prefix}${path}${req.nextUrl.search}`;

  // GET et HEAD n'ont pas de body
  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.text();

  // On copie les headers mais on enlève ceux qui posent problème
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");

  // Si on envoie un body, on met le content-type en JSON
  if (body && !headers.has("content-type")) {
    headers.set("Content-Type", "application/json");
  }

  // On récupère le token depuis les cookies et on l'ajoute en header
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Appel au backend
  let backendResponse: Response;
  try {
    backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch (error: any) {
    // Si le backend ne répond pas, on renvoie une erreur 502
    return NextResponse.json(
      {
        success: false,
        message:
          "Impossible de joindre l'API. Vérifiez que le backend tourne et que NEXT_PUBLIC_API_URL est correct.",
        details: error?.message,
      },
      { status: 502 },
    );
  }

  // On parse la réponse JSON du backend
  const data = await backendResponse.json().catch(() => null);

  // On crée la réponse à renvoyer au client
  const response = NextResponse.json(data ?? {}, {
    status: backendResponse.status,
  });

  // Si le backend renvoie un token, on le stocke dans un cookie httpOnly
  // C'est plus sécurisé que de le stocker en localStorage
  if (backendResponse.ok) {
    // Chercher le token - peut être à data.token ou data.data.token selon l'endpoint
    const token = data?.token || data?.data?.token || data?.access_token;

    if (token) {
      response.cookies.set({
        name: ACCESS_TOKEN_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
    }
  } else if (backendResponse.status === 401) {
    // Si 401, on supprime le cookie car le token n'est plus valide
    response.cookies.set({
      name: ACCESS_TOKEN_COOKIE,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
  }

  return response;
}

/**
 * Handler GET — transfère les requêtes GET vers le backend.
 * @param req - Requête entrante
 */
export async function GET(req: NextRequest) {
  return forwardRequest(req);
}

/**
 * Handler POST — transfère les requêtes POST vers le backend.
 * @param req - Requête entrante
 */
export async function POST(req: NextRequest) {
  return forwardRequest(req);
}

/**
 * Handler PUT — transfère les requêtes PUT vers le backend.
 * @param req - Requête entrante
 */
export async function PUT(req: NextRequest) {
  return forwardRequest(req);
}

/**
 * Handler PATCH — transfère les requêtes PATCH vers le backend.
 * @param req - Requête entrante
 */
export async function PATCH(req: NextRequest) {
  return forwardRequest(req);
}

/**
 * Handler DELETE — transfère les requêtes DELETE vers le backend.
 * @param req - Requête entrante
 */
export async function DELETE(req: NextRequest) {
  return forwardRequest(req);
}
