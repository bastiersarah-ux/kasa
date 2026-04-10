"use client";

import { FavoriteProvider } from "@/app/context/FavoriteContext";
import { ReactNode } from "react";

export default function FavoriteLayout({ children }: { children: ReactNode }) {
  return <FavoriteProvider>{children}</FavoriteProvider>;
}
