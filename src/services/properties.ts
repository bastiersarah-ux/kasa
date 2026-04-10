import {
  PropertySummary,
  PropertyDetails,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Liste toutes les propriétés.
 */
export async function listProperties(): Promise<PropertySummary[]> {
  return fetchAPI<PropertySummary[]>(`/properties`);
}

/**
 * Récupère le détail d'une propriété.
 * @param id Identifiant de propriété.
 */
export async function getProperty(id: string): Promise<PropertyDetails> {
  return fetchAPI<PropertyDetails>(`/properties/${id}`);
}

/**
 * Crée une propriété (rôle owner/admin requis).
 * @param input Données de création.
 */
export async function createProperty(
  input: CreatePropertyInput,
): Promise<PropertyDetails> {
  return fetchAPI<PropertyDetails>(`/properties`, {
    method: "POST",
    body: input,
  });
}

/**
 * Met à jour une propriété (rôle owner/admin requis).
 * @param id Identifiant de propriété.
 * @param input Champs à modifier.
 */
export async function updateProperty(
  id: string,
  input: UpdatePropertyInput,
): Promise<PropertyDetails> {
  return fetchAPI<PropertyDetails>(`/properties/${id}`, {
    method: "PATCH",
    body: input,
  });
}

/**
 * Supprime une propriété (rôle owner/admin requis).
 * @param id Identifiant de propriété.
 */
export async function deleteProperty(id: string): Promise<void> {
  await fetchAPI<void>(`/properties/${id}`, {
    method: "DELETE",
  });
}
