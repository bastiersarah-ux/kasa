/**
 * @module HashScroller
 * @description Composant utilitaire qui scrolle automatiquement
 * vers l'ancre présente dans le hash de l'URL au montage.
 */
"use client";

import { useEffect } from "react";

/**
 * Scrolle vers l'élément correspondant au hash de l'URL.
 * S'exécute une seule fois au montage du composant.
 * @example
 * // Sur /page#section, scrolle vers l'élément id="section"
 * <HashScroller />
 * @returns `null` (composant invisible)
 */
export default function HashScroller() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return null;
}
