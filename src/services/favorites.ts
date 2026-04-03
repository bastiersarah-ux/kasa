import { FavoriteActionResponse, FavoriteListItem } from "../types/api-types";
import { API_BASE, buildHeaders, request } from "../lib/http";

/**
 * Ajoute une propriété aux favoris de l’utilisateur.
 * @param propertyId Id de la propriété.
 * @param token JWT utilisateur connecté.
 */
export async function addFavorite(
  propertyId: string,
  token?: string,
): Promise<FavoriteActionResponse> {
  return request<FavoriteActionResponse>(
    `${API_BASE}/properties/${propertyId}/favorite`,
    {
      method: "POST",
      headers: buildHeaders(token),
    },
  );
}

/**
 * Retire une propriété des favoris.
 * @param propertyId Id de la propriété.
 * @param token JWT utilisateur connecté.
 */
export async function removeFavorite(
  propertyId: string,
  token?: string,
): Promise<FavoriteActionResponse> {
  return request<FavoriteActionResponse>(
    `${API_BASE}/properties/${propertyId}/favorite`,
    {
      method: "DELETE",
      headers: buildHeaders(token),
    },
  );
}

/**
 * Liste les favoris d’un utilisateur.
 * @param userId Id utilisateur.
 * @param token JWT autorisé.
 */
export async function listFavoritesForUser(
  userId: string | number,
  token?: string,
): Promise<FavoriteListItem[]> {
  return request<FavoriteListItem[]>(`${API_BASE}/users/${userId}/favorites`, {
    headers: buildHeaders(token),
  });
}
