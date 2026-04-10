import { PropertyDetails } from "@/types/api-types";

type EquipmentListProps = {
  equipments: PropertyDetails["equipments"];
};

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
