"use client";

import { PropertyDetails } from "@/types/api-types";

/** Props de la galerie de photos d'une propriété */
type GalleryProps = {
  pictures: string[];
};

/** Galerie de photos d'une propriété */
export default function Gallery({ pictures }: GalleryProps) {
  if (!pictures.length) return null;

  return (
    <div className="gallery">
      <img className="main-image" src={pictures[0]} alt="" />

      <div className="grid">
        {pictures.slice(1).map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>
    </div>
  );
}
