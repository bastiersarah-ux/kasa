import { Rating, AddRatingInput, RatingsSummary } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Liste les notes d'une propriété.
 * @param propertyId Identifiant de propriété.
 */
export async function listRatings(propertyId: string): Promise<Rating[]> {
  return fetchAPI<Rating[]>(`/properties/${propertyId}/ratings`);
}

/**
 * Crée une note pour une propriété.
 * @param propertyId Identifiant de propriété.
 * @param input Données de création.
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
