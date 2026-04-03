import FavoriteClient from "./FavoriteClient";
import { listFavoritesForUser } from "@/services/favorites";
import { FavoriteListItem } from "@/types/api-types";

// Supposons que tu passes userId en props ou via session
const userId = "current-user-id"; // à remplacer par ta logique de session

export default async function FavoritesPage() {
  const favorites = await listFavoritesForUser(userId);

  return <FavoriteClient favorites={favorites as FavoriteListItem[]} />;
}
