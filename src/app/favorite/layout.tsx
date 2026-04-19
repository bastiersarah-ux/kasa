/**
 * @module FavoriteLayout
 * @description Layout de la section favoris.
 * Encapsule les pages favoris dans un FavoriteProvider dédié.
 */
"use client";

import { FavoriteProvider } from "@/app/context/FavoriteContext";
import { ReactNode } from "react";

/**
 * Layout de la section favoris.
 * Fournit le contexte FavoriteProvider aux pages enfants.
 * @param props.children - Pages de la section favoris
 * @returns Le layout avec le provider de favoris
 */

export default function FavoriteLayout({ children }: { children: ReactNode }) {
  return <FavoriteProvider>{children}</FavoriteProvider>;
}
