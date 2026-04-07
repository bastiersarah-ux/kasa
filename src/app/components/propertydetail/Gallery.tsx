"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";

type GalleryProps = {
  pictures: string[];
};

export default function Gallery({ pictures }: GalleryProps) {
  const [index, setIndex] = useState(0);

  if (!pictures.length) return null;

  const next = () => setIndex((prev) => (prev + 1) % pictures.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + pictures.length) % pictures.length);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <>
      {/* DESKTOP MOSAIC */}
      <div className={styles.mosaic}>
        <img className={styles.mainImage} src={pictures[0]} alt="" />

        <div className={styles.grid}>
          {pictures.slice(1, 5).map((img, index) => (
            <img key={index} src={img} alt="" />
          ))}
        </div>
      </div>

      {/* MOBILE CAROUSEL */}
      <div
        className={styles.carousel}
        tabIndex={0}
        onKeyDown={handleKey}
        aria-label="carousel photos"
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {pictures.map((img, i) => (
            <div key={i} className={styles.slide}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>

        {pictures.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.left}`}
              onClick={prev}
              aria-label="previous image"
            >
              ❮
            </button>

            <button
              className={`${styles.arrow} ${styles.right}`}
              onClick={next}
              aria-label="next image"
            >
              ❯
            </button>
          </>
        )}
      </div>
    </>
  );
}
