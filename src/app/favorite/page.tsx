/**
 * @module FavoritesPage
 * @description Page des favoris de l'utilisateur.
 * Nécessite une authentification. Récupère les favoris côté serveur.
 */
export const dynamic = "force-dynamic";

import FavoriteClient from "./FavoriteClient";
import { listFavoritesForUser } from "@/services/favorites";
import { FavoriteListItem } from "@/types/api-types";
import { getCurrentUserId } from "@/helpers/require-auth";

/**
 * Page des favoris serveur.
 * Récupère l'ID utilisateur depuis le JWT puis charge ses favoris.
 * @returns La page des favoris avec la liste des propriétés aimées
 */

export default async function FavoritesPage() {
  // Récupère l'ID utilisateur actuel (redirige si pas authentifié)
  const userId = await getCurrentUserId();

  const favorites = await listFavoritesForUser(userId.toString());

  return <FavoriteClient favorites={favorites as FavoriteListItem[]} />;
}
