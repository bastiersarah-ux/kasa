import { PropertyDetails } from "@/types/api-types";
import { EquipmentList } from "./EquipmentList";
import { CategoryList } from "./CategoryList";
import Image from "next/image";
import LocalisationIcon from "@/public/location.svg";
import styles from "@/app/components/propertydetail/PropertyInfo.module.css";

type Props = {
  property: PropertyDetails;
};

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
          <div className="collapse collapse-arrow bg-white">
            <input type="checkbox" />
            <div className="collapse-title font-medium px-0 h4 text-black!">
              Équipements
            </div>
            <div className="collapse-content px-0">
              <EquipmentList equipments={property.equipments} />
            </div>
          </div>
        )}

        {property.tags?.length > 0 && (
          <div className="collapse collapse-arrow  bg-white">
            <input type="checkbox" />
            <div className="collapse-title font-medium px-0 h4 text-black!">
              Catégories
            </div>
            <div className="collapse-content px-0">
              <CategoryList tags={property.tags} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
