import {
  PropertySummary,
  PropertyDetails,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../types/api-types";
import { API_BASE, buildHeaders, request } from "../lib/http";

/**
 * Liste toutes les propriétés.
 */
export async function listProperties(): Promise<PropertySummary[]> {
  return request<PropertySummary[]>(`${API_BASE}/properties`);
}

/**
 * Récupère le détail d’une propriété.
 * @param id Identifiant de propriété.
 */
export async function getProperty(id: string): Promise<PropertyDetails> {
  return request<PropertyDetails>(`${API_BASE}/properties/${id}`);
}

/**
 * Crée une propriété (rôle owner/admin requis).
 * @param input Données de création.
 * @param token JWT d’un owner/admin.
 */
export async function createProperty(
  input: CreatePropertyInput,
  token?: string,
): Promise<PropertyDetails> {
  return request<PropertyDetails>(`${API_BASE}/properties`, {
    method: "POST",
    body: input,
    headers: buildHeaders(token),
  });
}

/**
 * Met à jour une propriété (rôle owner/admin requis).
 * @param id Identifiant de propriété.
 * @param input Champs à modifier.
 * @param token JWT d’un owner/admin.
 */
export async function updateProperty(
  id: string,
  input: UpdatePropertyInput,
  token?: string,
): Promise<PropertyDetails> {
  return request<PropertyDetails>(`${API_BASE}/properties/${id}`, {
    method: "PATCH",
    body: input,
    headers: buildHeaders(token),
  });
}

/**
 * Supprime une propriété (rôle owner/admin requis).
 * @param id Identifiant de propriété.
 * @param token JWT d’un owner/admin.
 */
export async function deleteProperty(id: string, token?: string): Promise<void> {
  await request<void>(`${API_BASE}/properties/${id}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
}
