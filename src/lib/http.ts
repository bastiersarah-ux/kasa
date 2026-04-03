import { env } from "../config/env";
import { ApiError } from "../types/api-types";
import { getStoredToken } from "./auth-storage";

export const API_BASE = `${env.apiUrl}/api`;
export const AUTH_BASE = `${env.apiUrl}/auth`;

export function buildHeaders(
  token?: string,
  extra: HeadersInit = {},
): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extra,
  } as Record<string, string>;

  const bearer = token ?? getStoredToken();
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
  const init: RequestInit = {
    ...rest,
    headers: buildHeaders(undefined, headers || {}),
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
