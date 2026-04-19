/**
 * @module ratings
 * @description Service de gestion des notes et avis sur les propriétés.
 */
import { Rating, AddRatingInput, RatingsSummary } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Récupère toutes les notes d'une propriété.
 * @param propertyId - Identifiant de la propriété
 * @returns Tableau des notes avec auteur et commentaire
 */
export async function listRatings(propertyId: string): Promise<Rating[]> {
  return fetchAPI<Rating[]>(`/properties/${propertyId}/ratings`);
}

/**
 * Ajoute une note à une propriété.
 * @param propertyId - Identifiant de la propriété à noter
 * @param input - Données de la note (score, commentaire, userId)
 * @returns Résumé mis à jour des notes de la propriété
 */
export async function createRating(
  propertyId: string,
  input: AddRatingInput,
): Promise<RatingsSummary> {
  return fetchAPI<RatingsSummary>(`/properties/${propertyId}/ratings`, {
    method: "POST",
    body: input,
  });
}
