/**
 * Décode un token JWT côté serveur pour extraire le payload.
 * Ne vérifie pas la signature (utilisé uniquement pour lire les données).
 * @param token - Chaîne JWT complète (header.payload.signature)
 * @returns Le payload décodé ou `null` en cas d'erreur
 */
export function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    // Ajouter le padding si nécessaire
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = Buffer.from(padded, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
