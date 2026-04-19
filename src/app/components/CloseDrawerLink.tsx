/**
 * @module CloseDrawerLink
 * @description Lien qui ferme le drawer de navigation mobile avant de naviguer.
 */
"use client";

import Link from "next/link";
import { ReactNode } from "react";

/** Props du lien avec fermeture du drawer */
interface CloseDrawerLinkProps {
  /** URL de destination */
  href: string;
  /** Contenu du lien */
  children: ReactNode;
  /** Classes CSS supplémentaires */
  className?: string;
  /** Label d'accessibilité */
  ariaLabel?: string;
}

/**
 * Lien de navigation qui ferme le drawer mobile au clic.
 * Combine un `Link` Next.js avec la fermeture du tiroir latéral.
 * @param props - Props du lien
 * @returns Un lien qui ferme le menu mobile puis navigue
 */

export default function CloseDrawerLink({
  href,
  children,
  className = "",
  ariaLabel,
}: CloseDrawerLinkProps) {
  const handleClick = () => {
    const checkbox = document.getElementById(
      "drawer-toggle",
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
    </Link>
  );
}
