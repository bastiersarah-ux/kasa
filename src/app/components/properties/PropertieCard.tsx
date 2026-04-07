"use client";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./PropertieCard.module.css";
import { PropertyDetails, PropertySummary } from "@/types/api-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

/** Props de la carte propriété */
type PropertieCardProps = {
  property: PropertySummary;
};

/** Carte affichant une propriété */
export default function PropertieCard({ property }: PropertieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    // if (!isAuthenticated) {
    //   logout("/auth/login");
    //   return;
    // }

    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/properties/${property.id}`} className={`card ${styles.card}`}>
      <button
        onClick={handleClick}
        className={`btn btn-ghost btn-square ${styles["btn-favorite"]} ${
          isFavorite ? styles.active : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          className="size-[1.2em]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <Image
        src={property.cover!}
        alt={property.title}
        width={1900}
        height={800}
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
