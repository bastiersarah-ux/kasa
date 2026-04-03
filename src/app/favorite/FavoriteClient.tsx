"use client";

import PropertiesList from "@/app/components/properties/PropertiesList";
import { FavoriteListItem } from "@/types/api-types";
import { useFavorites } from "@/app/context/FavoriteContext";

type FavoriteClientProps = {
  favorites: FavoriteListItem[];
};

export default function FavoriteClient({
  favorites: initialFavorites,
}: FavoriteClientProps) {
  const { favorites, isLoading } = useFavorites();

  // Si le context est vide au démarrage, on peut initialiser avec les props
  // (optionnel, selon comment tu veux gérer la sync)
  // useEffect(() => {
  //   if (favorites.length === 0 && initialFavorites.length > 0) {
  //     refreshFavorites(initialFavorites);
  //   }
  // }, []);

  if (isLoading) {
    return <p>Chargement des favoris...</p>;
  }

  if ((favorites ?? initialFavorites).length === 0) {
    return <p>Vous n’avez aucun favori pour le moment.</p>;
  }

  return (
    <PropertiesList
      properties={favorites.length ? favorites : initialFavorites}
    />
  );
}
