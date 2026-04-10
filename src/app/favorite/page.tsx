import FavoriteClient from "./FavoriteClient";
import { listFavoritesForUser } from "@/services/favorites";
import { FavoriteListItem } from "@/types/api-types";
import { getCurrentUserId } from "@/helpers/require-auth";

export default async function FavoritesPage() {
  // Récupère l'ID utilisateur actuel (redirige si pas authentifié)
  const userId = await getCurrentUserId();

  const favorites = await listFavoritesForUser(userId.toString());

  return <FavoriteClient favorites={favorites as FavoriteListItem[]} />;
}
