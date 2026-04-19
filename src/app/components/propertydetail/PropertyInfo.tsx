/**
 * @module PropertyInfo
 * @description Section d'informations détaillées d'une propriété.
 * Affiche le titre, la localisation, la description, les équipements et les catégories.
 */
import { PropertyDetails } from "@/types/api-types";
import { EquipmentList } from "./EquipmentList";
import { CategoryList } from "./CategoryList";
import Image from "next/image";
import LocalisationIcon from "@/public/location.svg";
import styles from "@/app/components/propertydetail/PropertyInfo.module.css";

/** Props du composant PropertyInfo */
type Props = {
  /** Détail complet de la propriété */
  property: PropertyDetails;
};

/**
 * Affiche les informations détaillées d'une propriété dans une carte.
 * Inclut le titre, la localisation, la description
 * et des sections repliables pour les équipements et catégories.
 * @param props - Détail de la propriété
 * @returns Carte d'informations complète
 */

export default function PropertyInfo({ property }: Props) {
  return (
    <div className="card  bg-white shadow-md">
      <div className="card-body space-y-4">
        <h1 className={styles.title}>{property.title}</h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Image
            src={LocalisationIcon}
            alt="Icône de localisation"
            width={14}
            height={14}
          />
          {property.location && <p>{property.location}</p>}
        </div>

        {property.description && <p>{property.description}</p>}

        {property.equipments?.length > 0 && (
          <details className="collapse collapse-arrow bg-white">
            <summary className="collapse-title font-medium px-0 h4 text-black!">
              Équipements
            </summary>
            <div className="collapse-content px-0">
              <EquipmentList equipments={property.equipments} />
            </div>
          </details>
        )}

        {property.tags?.length > 0 && (
          <details className="collapse collapse-arrow bg-white">
            <summary className="collapse-title font-medium px-0 h4 text-black!">
              Catégories
            </summary>
            <div className="collapse-content px-0">
              <CategoryList tags={property.tags} />
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
