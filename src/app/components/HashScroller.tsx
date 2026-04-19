"use client";

import { useEffect } from "react";

/** Scrolle vers l'ancre du hash dès le montage */
export default function HashScroller() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return null;
}
