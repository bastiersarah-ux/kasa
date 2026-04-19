/**
 * @module CloseDrawerButton
 * @description Bouton qui ferme le drawer de navigation mobile.
 * Utilisé dans le menu latéral pour fermer le tiroir au clic.
 */
"use client";

import { ReactNode } from "react";

/** Props du bouton de fermeture du drawer */
interface CloseDrawerButtonProps {
  /** Contenu du bouton */
  children?: ReactNode;
  /** Classes CSS supplémentaires */
  className?: string;
  /** Label d'accessibilité */
  "aria-label"?: string;
}

/**
 * Bouton qui ferme le drawer de navigation mobile.
 * Décoche la checkbox `#drawer-toggle` pour fermer le tiroir.
 * @param props - Props du bouton
 * @returns Un bouton qui ferme le menu mobile au clic
 */

export default function CloseDrawerButton({
  children,
  className = "",
  "aria-label": ariaLabel,
}: CloseDrawerButtonProps) {
  const handleClick = () => {
    const checkbox = document.getElementById(
      "drawer-toggle",
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
    <button className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
