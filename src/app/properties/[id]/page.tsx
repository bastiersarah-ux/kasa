import { getProperty } from "@/services";
import PropertyDetailClient from "./PropertyDetailClient";

type PropertyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id: propertyId } = await params;
  const property = await getProperty(propertyId);

  return (
    <>
      <PropertyDetailClient property={property} />
    </>
  );
}
