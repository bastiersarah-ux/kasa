/**
 * @module FavoriteClient
 * @description Composant client de la page des favoris.
 * Affiche la grille des propriétés favorites avec synchronisation via le contexte.
 */
"use client";

import PropertiesList from "@/app/components/properties/PropertiesList";
import { FavoriteListItem } from "@/types/api-types";
import { useFavorites } from "@/app/context/FavoriteContext";

/** Props du composant FavoriteClient */
type FavoriteClientProps = {
  /** Favoris chargés côté serveur (utilisés comme fallback initial) */
  favorites: FavoriteListItem[];
};

/**
 * Composant client affichant la liste des favoris.
 * Utilise les favoris du contexte (temps réel) avec fallback sur les props serveur.
 * @param props - Favoris initiaux chargés côté serveur
 * @returns Grille de propriétés favorites ou message si vide
 */

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
    return (
      <p className="flex-1 flex justify-center items-center">
        Vous n’avez aucun favori pour le moment.
      </p>
    );
  }

  return (
    <div className="flex-1 page-content mx-auto p-4">
      <div className="flex flex-col w-full text-center justify-center">
        <h1>Vos favoris</h1>
        <h2 className="h3">
          Retrouvez ici tous les logements que vous avez aimés.
          <br /> Prêts à réserver ? Un simple clic et votre prochain séjour est
          en route.
        </h2>
      </div>
      <PropertiesList
        properties={favorites.length ? favorites : initialFavorites}
      />
    </div>
  );
}
