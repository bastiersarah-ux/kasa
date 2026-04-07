"use client";

import PropertieCard from "./PropertieCard";
import { PropertySummary } from "@/types/api-types";

export type PropertiesListProps = {
  properties: PropertySummary[];
};

/** Liste des propriétés */
export default function PropertiesList({ properties }: PropertiesListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
      {(properties ?? []).map((property) => (
        <PropertieCard key={property.id} property={property} />
      ))}
    </div>
  );
}
