import { FavoriteActionResponse, FavoriteListItem } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Ajoute une propriété aux favoris de l'utilisateur.
 * @param propertyId Id de la propriété.
 */
export async function addFavorite(
  propertyId: string,
): Promise<FavoriteActionResponse> {
  return fetchAPI<FavoriteActionResponse>(
    `/properties/${propertyId}/favorite`,
    {
      method: "POST",
    },
  );
}

/**
 * Retire une propriété des favoris.
 * @param propertyId Id de la propriété.
 */
export async function removeFavorite(
  propertyId: string,
): Promise<FavoriteActionResponse> {
  return fetchAPI<FavoriteActionResponse>(
    `/properties/${propertyId}/favorite`,
    {
      method: "DELETE",
    },
  );
}

/**
 * Liste les favoris d'un utilisateur.
 * @param userId Id utilisateur.
 */
export async function listFavoritesForUser(
  userId: string | number,
): Promise<FavoriteListItem[]> {
  return fetchAPI<FavoriteListItem[]>(`/users/${userId}/favorites`);
}
