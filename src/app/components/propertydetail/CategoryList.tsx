import { PropertyDetails } from "@/types/api-types";

type CategoryListProps = {
  tags: PropertyDetails["tags"];
};

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
