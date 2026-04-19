import { PropertySummary } from "@/types/api-types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import styles from "./PropertieCard.module.css";

/** Props de la carte propriété */
type PropertieCardProps = {
  property: PropertySummary;
};

/** Carte affichant une propriété (server component) */
export default function PropertieCard({ property }: PropertieCardProps) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`card ${styles.card}`}
    >
      <FavoriteButton property={property} />
      <Image
        src={property.cover!}
        alt=""
        role="presentation"
        width={600}
        height={400}
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 32px), calc(33vw - 32px)"
      />
      <section>
        <div>
          <h2>{property.title}</h2>
          <p>{property.location}</p>
        </div>
        <p>
          <b>{property.price_per_night} €</b> par nuit
        </p>
      </section>
    </Link>
  );
}
