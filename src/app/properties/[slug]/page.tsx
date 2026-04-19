import { getPropertyBySlug } from "@/services";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <>
      <PropertyDetailClient property={property} />
    </>
  );
}
