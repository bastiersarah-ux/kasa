"use client";

import Gallery from "@/app/components/propertydetail/Gallery";
import HostCard from "@/app/components/propertydetail/HostCard";
import PropertyInfo from "@/app/components/propertydetail/PropertyInfo";
import { PropertyDetails } from "@/types/api-types";
import BackButton from "../../components/propertydetail/BackButton";
import { useRouter } from "next/navigation";

type PropertyDetailProps = {
  property?: PropertyDetails;
};

export default function PropertyDetailClient({
  property,
}: PropertyDetailProps) {
  const router = useRouter();
  if (!property) return <p>Propriété introuvable</p>;

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="property-page container mx-auto p-4">
      <BackButton onClick={handleClick} />

      <div className="top-section flex flex-col lg:flex-row gap-6 mt-4">
        <div className="flex-2">
          <Gallery pictures={property.pictures ?? []} />
        </div>

        <div className="flex-1">
          <HostCard
            host={property.host}
            rating={property.rating_avg}
            ratingCount={property.ratings_count}
          />
        </div>
      </div>

      <PropertyInfo property={property} />
    </div>
  );
}
