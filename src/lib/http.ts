import { env } from "../config/env";
import { ApiError } from "../types/api-types";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";

export const API_BASE = `${env.apiUrl}/api`;
export const AUTH_BASE = `${env.apiUrl}/auth`;

export async function buildHeaders(
  token?: string,
  extra: HeadersInit = {},
): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extra,
  } as Record<string, string>;

  // Utiliser le token fourni, ou le lire depuis les cookies côté serveur
  let bearer = token;
  if (!bearer && typeof window === "undefined") {
    // Côté serveur, lire le cookie httpOnly
    try {
      const cookieStore = await cookies();
      bearer = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
      console.log(bearer);
    } catch (e) {
      // Les cookies ne sont pas disponibles
    }
  }

  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  return headers;
}

type JsonRequestInit = Omit<RequestInit, "body"> & { body?: any };

/**
 * Envoi une requête avec la fonction fetch
 * @param url Chemin absolu ou relatif à appeler.
 * @param options Méthode, corps JSON, en-têtes supplémentaires.
 */
export async function request<T>(
  url: string,
  options: JsonRequestInit = {},
): Promise<T> {
  const { body, headers, ...rest } = options;
  const resolvedHeaders = await buildHeaders(undefined, headers || {});

  const init: RequestInit = {
    ...rest,
    headers: resolvedHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };
  if (init.body) {
    (init.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  const res = await fetch(url, init);
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      (data && (data as ApiError).error) || res.statusText || "Request failed";
    throw new Error(message);
  }
  return data as T;
}
