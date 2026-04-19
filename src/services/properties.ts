/**
 * @module properties
 * @description Service de gestion des propriétés (logements).
 * CRUD complet avec recherche par slug.
 */
import {
  PropertySummary,
  PropertyDetails,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Récupère la liste de toutes les propriétés disponibles.
 * @returns Tableau de résumés de propriétés
 */
export async function listProperties(): Promise<PropertySummary[]> {
  return fetchAPI<PropertySummary[]>(`/properties`);
}

/**
 * Récupère le détail complet d'une propriété par son identifiant.
 * @param id - Identifiant unique de la propriété
 * @returns Détail complet de la propriété
 */
export async function getProperty(id: string): Promise<PropertyDetails> {
  return fetchAPI<PropertyDetails>(`/properties/${id}`);
}

/**
 * Récupère le détail d'une propriété par son slug URL.
 * L'API ne supportant pas la recherche par slug directement,
 * on récupère la liste complète puis on filtre localement.
 * @param slug - Slug URL-friendly de la propriété
 * @returns Détail de la propriété ou `null` si non trouvée
 */
export async function getPropertyBySlug(
  slug: string,
): Promise<PropertyDetails | null> {
  const all = await listProperties();
  const match = all.find((p) => p.slug === slug);
  if (!match) return null;
  return getProperty(match.id);
}

/**
 * Crée une nouvelle propriété.
 * Nécessite le rôle owner ou admin.
 * @param input - Données de création du logement
 * @returns La propriété créée avec ses détails complets
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
 * Met à jour une propriété existante.
 * Nécessite le rôle owner ou admin.
 * @param id - Identifiant de la propriété à modifier
 * @param input - Champs à mettre à jour
 * @returns La propriété mise à jour
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
 * Supprime une propriété.
 * Nécessite le rôle owner ou admin.
 * @param id - Identifiant de la propriété à supprimer
 */
export async function deleteProperty(id: string): Promise<void> {
  await fetchAPI<void>(`/properties/${id}`, {
    method: "DELETE",
  });
}
