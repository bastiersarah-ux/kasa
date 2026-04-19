"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useFavorites } from "@/app/context/FavoriteContext";
import { PropertySummary } from "@/types/api-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PropertieCard.module.css";

type Props = {
  property: PropertySummary;
};

/** Bouton favori (client component — seule partie interactive de la carte) */
export default function FavoriteButton({ property }: Props) {
  const { isAuthenticated } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isFavorite = favorites.some((fav) => fav.id === property.id);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    try {
      setIsLoading(true);
      if (isFavorite) {
        await removeFavorite(property.id);
      } else {
        await addFavorite(property as any);
      }
    } catch (error) {
      console.error("Erreur modification favoris:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`btn btn-ghost btn-square ${styles["btn-favorite"]} ${
        isFavorite ? styles.active : ""
      }`}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg
        width="11"
        height="10"
        viewBox="0 0 11 10"
        className="size-[1.2em]"
        fill={isFavorite ? "currentColor" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M7.3584 0.601562C8.81699 0.601778 10 1.7855 10 3.24414C9.99992 5.04754 8.82655 6.56502 7.63281 7.64062C7.03798 8.17659 6.44291 8.59872 5.99609 8.88672C5.77284 9.03061 5.58692 9.14162 5.45703 9.21582C5.3924 9.25274 5.34117 9.28011 5.30664 9.29883C5.30457 9.29995 5.30175 9.30071 5.2998 9.30176C5.29796 9.30076 5.2959 9.29989 5.29395 9.29883C5.25947 9.28013 5.2083 9.25283 5.14355 9.21582C5.0137 9.14159 4.82773 9.03067 4.60449 8.88672C4.15768 8.59858 3.56172 8.17679 2.9668 7.64062C1.77304 6.56475 0.59969 5.04654 0.599609 3.24414C0.599609 1.7833 1.78359 0.599636 3.24219 0.601562C4.03522 0.601619 4.74029 0.957962 5.22461 1.51367L5.2998 1.59961L5.375 1.51367C5.86148 0.957689 6.5654 0.601562 7.3584 0.601562Z"
          fill={isFavorite ? "white" : "#868686"}
          stroke={isFavorite ? "white" : "#F5F5F5"}
          strokeWidth="0.2"
        />
        <path
          d="M7.3584 0.149658C9.06337 0.149658 10.4512 1.53968 10.4512 3.24438C10.451 5.19368 9.23589 6.79293 8.02344 7.90552C6.80765 9.02115 5.56723 9.67204 5.46191 9.72681L5.45605 9.72974C5.41065 9.75092 5.35912 9.76587 5.30078 9.76587C5.24245 9.76587 5.19091 9.75092 5.14551 9.72974L5.13965 9.72681C5.03428 9.67201 3.79393 9.02046 2.57812 7.90454C1.36571 6.79173 0.15053 5.19269 0.150391 3.24438C0.150391 1.53967 1.53819 0.149658 3.24316 0.149658C4.0043 0.149755 4.73414 0.440216 5.30078 0.952393C5.86742 0.440217 6.59726 0.149755 7.3584 0.149658ZM3.24316 0.849854C1.92416 0.849854 0.850586 1.92507 0.850586 3.24438C0.850722 4.80816 1.80163 6.16563 2.85938 7.1897C3.84429 8.14323 4.90236 8.78525 5.30078 9.01294C5.6992 8.78525 6.75727 8.14323 7.74219 7.1897C8.79993 6.16563 9.75084 4.80816 9.75098 3.24438C9.75098 1.92523 8.67756 0.851807 7.3584 0.851807C6.76384 0.851905 6.18857 1.08264 5.74707 1.49243L5.56543 1.67896C5.44674 1.81326 5.23637 1.83036 5.09473 1.72974L5.03809 1.67896C4.57796 1.15094 3.92261 0.849966 3.24316 0.849854Z"
          fill={isFavorite ? "#F5F5F5" : "white"}
          stroke={isFavorite ? "#F5F5F5" : "white"}
          strokeWidth="0.3"
        />
      </svg>
    </button>
  );
}
