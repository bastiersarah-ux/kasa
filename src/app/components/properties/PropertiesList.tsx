/**
 * @module PropertiesList
 * @description Grille responsive affichant une liste de cartes de propriétés.
 */
import PropertieCard from "./PropertieCard";
import { PropertySummary } from "@/types/api-types";

/** Props de la liste de propriétés */
export type PropertiesListProps = {
  /** Tableau des propriétés à afficher */
  properties: PropertySummary[];
  /** Identifiant HTML de la grille (pour l'ancrage) */
  id?: string;
};

/**
 * Grille responsive de cartes de propriétés.
 * S'adapte de 1 colonne (mobile) à 3 colonnes (desktop).
 * @param props - Liste des propriétés et id optionnel
 * @returns Grille de cartes PropertieCard
 */
export default function PropertiesList({
  properties,
  id,
}: PropertiesListProps) {
  return (
    <div
      id={id}
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr"
    >
      {(properties ?? []).map((property) => (
        <PropertieCard key={property.id} property={property} />
      ))}
    </div>
  );
}
