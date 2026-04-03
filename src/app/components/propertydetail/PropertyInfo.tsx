import { PropertyDetails } from "@/types/api-types";
import { EquipmentList } from "./EquipmentList";
import { CategoryList } from "./CategoryList";
import Image from "next/image";
import LocalisationIcon from "@/public/location.svg";

type Props = {
  property: PropertyDetails;
};

const PropertyInfo = ({ property }: Props) => {
  return (
    <div className="property-info">
      <h1>{property.title}</h1>
      <Image
        src={LocalisationIcon}
        alt="Icône de localisation"
        width={5}
        height={5}
      />
      {property.location && <p>{property.location}</p>}

      {property.description && <p>{property.description}</p>}

      <EquipmentList equipments={property.equipments} />
      <CategoryList tags={property.tags} />
    </div>
  );
};

export default PropertyInfo;
