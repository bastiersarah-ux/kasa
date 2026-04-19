/**
 * @module fetch-api
 * @description Client HTTP principal de l'application.
 * Toutes les requêtes passent par le proxy Next.js `/api/proxy`.
 */

/** URL de base du proxy API Next.js */
export const API_URL = "/api/proxy";

/**
 * Erreur de validation retournée par l'API.
 * Contient la liste des erreurs par champ.
 */
export class ValidationError extends Error {
  /** Liste des erreurs de validation par champ */
  errors: Array<{ field: string; message: string }>;

  /**
   * @param message - Message d'erreur global
   * @param errors - Détail des erreurs par champ
   */
  constructor(
    message: string,
    errors: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

/** Options de requête sans body typé (le body est sérialisé automatiquement) */
type FetchAPIOptions = Omit<RequestInit, "body"> & {
  body?: any;
};

/**
 * Effectue une requête HTTP vers l'API via le proxy Next.js.
 * Gère automatiquement la sérialisation JSON, les cookies d'authentification
 * côté serveur et la redirection vers `/auth/login` en cas de 401 côté client.
 *
 * @template T - Type de la réponse attendue
 * @param path - Chemin de l'API (ex: `/properties`, `/auth/login`)
 * @param options - Options de la requête (méthode, body, headers, etc.)
 * @returns La réponse JSON typée
 * @throws {ValidationError} Si l'API retourne des erreurs de validation
 * @throws {Error} Pour toute autre erreur réseau ou serveur
 */
export async function fetchAPI<T = any>(
  path: string,
  options: FetchAPIOptions = {},
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const headers = new Headers(options.headers);
  // Le token est dans le cookie httpOnly, le proxy le gère automatiquement
  const isServer = typeof window === "undefined";
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 4000}`);

  let url = `${API_URL}${normalizedPath}`;

  if (isServer) {
    url = new URL(url, origin).toString();
    try {
      const { headers: nextHeaders } = await import("next/headers");
      const incoming = await nextHeaders();
      const cookieHeader = incoming?.get?.("cookie");
      if (cookieHeader && !headers.has("cookie")) {
        headers.set("cookie", cookieHeader);
      }
    } catch {}
  }

  let res: Response;
  try {
    // Stringify body si c'est un objet
    const body =
      options.body && typeof options.body === "object"
        ? JSON.stringify(options.body)
        : options.body;

    res = await fetch(url, {
      ...options,
      body,
      cache: options.cache ?? "no-store",
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...Object.fromEntries(headers.entries()),
      },
      credentials: options.credentials ?? "include",
    });
  } catch (error: any) {
    throw new Error(
      `Erreur réseau lors de l'appel à ${url}: ${error?.message || error}`,
    );
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!isJson) {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(
        `Erreur ${res.status} ${res.statusText}${
          text ? `: ${text.slice(0, 200)}` : ""
        }`,
      );
    }
    // Pour les DELETE/204, on retourne undefined cast en T (assignable si T est void)
    return undefined as T;
  }

  const body = (await res.json()) as T;

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/auth/")) {
        window.location.href = "/auth/login";
      }
    }

    const errorBody = body as {
      message?: string;
      data?: { errors?: Array<{ field: string; message: string }> };
    };
    if (errorBody.data?.errors && Array.isArray(errorBody.data.errors)) {
      throw new ValidationError(
        errorBody.message || "Erreur de validation",
        errorBody.data.errors,
      );
    }

    throw new Error((body as { message: string })?.message || "Erreur serveur");
  }

  return body;
}
