import { Rating, AddRatingInput, RatingsSummary } from "../types/api-types";
import { API_BASE, buildHeaders, request } from "../lib/http";

/**
 * Liste les avis d’une propriété.
 * @param propertyId Id de la propriété.
 */
export async function listRatings(propertyId: string): Promise<Rating[]> {
  return request<Rating[]>(`${API_BASE}/properties/${propertyId}/ratings`);
}

/**
 * Ajoute un avis pour une propriété.
 * @param propertyId Id de la propriété.
 * @param input Score/commentaire à poster.
 */
export async function addRating(
  propertyId: string,
  input: AddRatingInput,
  token?: string,
): Promise<RatingsSummary> {
  return request<RatingsSummary>(
    `${API_BASE}/properties/${propertyId}/ratings`,
    {
      method: "POST",
      body: input,
      headers: buildHeaders(token),
    },
  );
}
