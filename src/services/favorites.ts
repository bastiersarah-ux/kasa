/**
 * @module favorites
 * @description Service de gestion des favoris utilisateur.
 */
import { FavoriteActionResponse, FavoriteListItem } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Ajoute une propriété aux favoris de l'utilisateur connecté.
 * @param propertyId - Identifiant de la propriété à ajouter
 * @returns Confirmation de l'ajout
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
 * Retire une propriété des favoris de l'utilisateur connecté.
 * @param propertyId - Identifiant de la propriété à retirer
 * @returns Confirmation de la suppression
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
 * Récupère la liste des favoris d'un utilisateur.
 * @param userId - Identifiant de l'utilisateur
 * @returns Liste des propriétés favorites
 */
export async function listFavoritesForUser(
  userId: string | number,
): Promise<FavoriteListItem[]> {
  return fetchAPI<FavoriteListItem[]>(`/users/${userId}/favorites`);
}
