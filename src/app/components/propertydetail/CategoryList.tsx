/**
 * @module CategoryList
 * @description Affiche la liste des tags/catégories d'une propriété.
 */
import { PropertyDetails } from "@/types/api-types";

/** Props de la liste de catégories */
type CategoryListProps = {
  /** Tableau des tags de la propriété */
  tags: PropertyDetails["tags"];
};

/**
 * Affiche les tags/catégories d'une propriété sous forme de badges.
 * Ne rend rien si la liste est vide.
 * @param props - Tags à afficher
 * @returns Liste de badges ou `null`
 */

export const CategoryList = ({ tags }: CategoryListProps) => {
  if (!tags?.length) return null;

  return (
    <div className="section">
      <div className="property-info_badge-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag badge badge-soft">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
