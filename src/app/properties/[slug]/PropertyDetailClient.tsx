/**
 * @module PropertyDetailClient
 * @description Composant client de la page de détail d'une propriété.
 * Affiche la galerie, la carte hôte et les informations détaillées.
 */
"use client";

import Gallery from "@/app/components/propertydetail/Gallery";
import HostCard from "@/app/components/propertydetail/HostCard";
import { PropertyDetails } from "@/types/api-types";
import BackButton from "../../components/propertydetail/BackButton";
import { useRouter } from "next/navigation";
import PropertyInfo from "@/app/components/propertydetail/PropertyInfo";
import styles from "./PropertyDetailClient.module.css";

/** Props du composant de détail */
type PropertyDetailProps = {
  /** Détail de la propriété à afficher (optionnel pour gérer le cas introuvable) */
  property?: PropertyDetails;
};

/**
 * Composant client affichant le détail complet d'une propriété.
 * Organise la galerie, la carte hôte et les informations en grille responsive.
 * @param props - Détail de la propriété
 * @returns Page de détail ou message d'erreur
 */

export default function PropertyDetailClient({
  property,
}: PropertyDetailProps) {
  const router = useRouter();
  if (!property) return <p>Propriété introuvable</p>;

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="property-page page-content mx-auto p-4">
      <BackButton onClick={handleClick} />

      <div className={styles["grid-content"]}>
        <section className={styles.gallery}>
          <Gallery pictures={property.pictures ?? []} />
        </section>
        <section className={styles.hostcard}>
          <HostCard
            host={property.host}
            rating={property.rating_avg}
            ratingCount={property.ratings_count}
          />
        </section>
        <section className={styles.property}>
          <PropertyInfo property={property} />
        </section>
      </div>
    </div>
  );
}
