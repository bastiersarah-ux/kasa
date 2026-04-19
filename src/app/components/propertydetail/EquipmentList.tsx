/**
 * @module EquipmentList
 * @description Affiche la liste des équipements d'une propriété.
 */
import { PropertyDetails } from "@/types/api-types";

/** Props de la liste d'équipements */
type EquipmentListProps = {
  /** Tableau des équipements de la propriété */
  equipments: PropertyDetails["equipments"];
};

/**
 * Affiche les équipements d'une propriété sous forme de badges.
 * Ne rend rien si la liste est vide.
 * @param props - Équipements à afficher
 * @returns Liste de badges ou `null`
 */

export const EquipmentList = ({ equipments }: EquipmentListProps) => {
  if (!equipments?.length) return null;

  return (
    <div className="section">
      <ul className="property-info_badge-container">
        {equipments.map((item, index) => (
          <li key={index} className="tag badge badge-soft">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
