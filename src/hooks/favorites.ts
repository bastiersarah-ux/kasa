import {
  addFavorite,
  listFavoritesForUser,
  removeFavorite,
} from "@/services/favorites";
import { FavoriteActionResponse, FavoriteListItem } from "@/types/api-types";
import { getStoredToken } from "@/lib/auth-storage";
import { useAsync } from "./base/useAsync";
import { useAsyncAction } from "./base/useAsyncAction";

export function useUserFavorites(userId?: string | number, token?: string) {
  const result = useAsync<FavoriteListItem[]>(
    () =>
      listFavoritesForUser(
        userId as string | number,
        token ?? getStoredToken() ?? undefined,
      ),
    [userId, token],
    { enabled: Boolean(userId && (token ?? getStoredToken())) },
  );
  return { ...result, favorites: result.data ?? [] };
}

export function useAddFavorite(token?: string) {
  return useAsyncAction((propertyId: string) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return addFavorite(propertyId, auth) as Promise<FavoriteActionResponse>;
  });
}

export function useRemoveFavorite(token?: string) {
  return useAsyncAction((propertyId: string) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return removeFavorite(propertyId, auth) as Promise<FavoriteActionResponse>;
  });
}
