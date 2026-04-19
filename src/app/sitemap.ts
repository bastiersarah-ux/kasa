/**
 * @module sitemap
 * @description Génération automatique du sitemap.xml.
 * Inclut les routes statiques et les propriétés dynamiques depuis l'API backend.
 * Accessible à l'URL `/sitemap.xml`.
 */
import type { MetadataRoute } from "next";
import { env } from "@/config/env";

/** URL de base du site (utilisée pour construire les URLs absolues) */
const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "http://localhost:4000";

/**
 * Génère le sitemap de l'application.
 * Combine les routes statiques connues avec les propriétés
 * récupérées dynamiquement depuis l'API backend.
 * @returns Tableau d'entrées sitemap conformes au format Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${BASE_URL}/auth/login`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/auth/register`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/favorite`,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/chat`,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  // Routes dynamiques : propriétés
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${env.apiUrl}/api/properties`);
    if (res.ok) {
      const properties: { slug: string }[] = await res.json();
      propertyRoutes = properties.map((p) => ({
        url: `${BASE_URL}/properties/${p.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Si l'API est indisponible, on génère le sitemap sans les propriétés
  }

  return [...staticRoutes, ...propertyRoutes];
}
