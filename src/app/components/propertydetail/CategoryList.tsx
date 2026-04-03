import { PropertyDetails } from "@/types/api-types";

type CategoryListProps = {
  tags: PropertyDetails["tags"];
};

export const CategoryList = ({ tags }: CategoryListProps) => {
  if (!tags?.length) return null;

  return (
    <div className="section">
      <h3>Catégories</h3>

      <div className="tag-list">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
