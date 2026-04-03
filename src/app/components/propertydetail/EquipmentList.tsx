import { PropertyDetails } from "@/types/api-types";

type EquipmentListProps = {
  equipments: PropertyDetails["equipments"];
};

export const EquipmentList = ({ equipments }: EquipmentListProps) => {
  if (!equipments?.length) return null;

  return (
    <div className="section">
      <h3>Équipements</h3>

      <ul className="equipment-list">
        {equipments.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
