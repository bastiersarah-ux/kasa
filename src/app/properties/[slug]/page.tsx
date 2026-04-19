/**
 * @module PropertyDetailPage
 * @description Page de détail d'une propriété.
 * Résout le slug en propriété via l'API et affiche le détail complet.
 */
export const dynamic = "force-dynamic";

import { getPropertyBySlug } from "@/services";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";

/** Props de la page de détail (paramètre dynamique slug) */
type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Page serveur de détail d'une propriété.
 * Résout le slug depuis les paramètres de route,
 * récupère les détails depuis l'API et affiche la page.
 * Retourne une 404 si le slug ne correspond à aucune propriété.
 * @param props - Paramètres de route contenant le slug
 * @returns Page de détail ou 404
 */

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
