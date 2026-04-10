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

  const openModal = (index: number = 0) => {
    const modal = document.getElementById(
      "dialog_carousel",
    ) as HTMLDialogElement;
    if (modal) {
      setIndex(() => index);
      modal.showModal();
    }
  };

  return (
    <>
      {/* DESKTOP MOSAIC */}
      <div className={styles.mosaic}>
        <img
          className={styles.mainImage}
          src={pictures[0]}
          alt=""
          onClick={() => openModal()}
        />

        <div className={styles.grid}>
          {pictures.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              onClick={() => openModal(index + 1)}
            />
          ))}
        </div>
      </div>

      <dialog id="dialog_carousel" className="modal">
        <div className="modal-box">
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
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
