import { addRating, listRatings } from "@/services/ratings";
import { AddRatingInput, Rating, RatingsSummary } from "@/types/api-types";
import { getStoredToken } from "@/lib/auth-storage";
import { useAsync } from "./base/useAsync";
import { useAsyncAction } from "./base/useAsyncAction";

export function useRatings(propertyId?: string) {
  const result = useAsync<Rating[]>(
    () => listRatings(propertyId as string),
    [propertyId],
    { enabled: Boolean(propertyId) },
  );
  return { ...result, ratings: result.data ?? [] };
}

export function useAddRating(propertyId?: string) {
  return useAsyncAction((input: AddRatingInput) => {
    if (!propertyId) return Promise.reject(new Error("Id propriété manquant"));
    const token = getStoredToken() ?? undefined;
    return addRating(propertyId, input, token) as Promise<RatingsSummary>;
  });
}
