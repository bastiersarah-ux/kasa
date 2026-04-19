/**
 * @module auth-storage
 * @description Gestion du stockage du token d'authentification côté client.
 * Le token est stocké dans un cookie httpOnly et n'est pas accessible au JavaScript.
 * Ces fonctions sont conservées pour compatibilité mais ne doivent pas être utilisées.
 */
import { ACCESS_TOKEN_COOKIE } from "../helpers/auth-cookie";

/** Clé du cookie d'authentification */
const TOKEN_KEY = ACCESS_TOKEN_COOKIE;

/**
 * Récupère le token stocké.
 * @deprecated Le token est dans un cookie httpOnly et n'est pas accessible au JavaScript.
 * Utilisez le contexte AuthContext pour gérer l'authentification.
 * @returns Toujours `null`
 */
export function getStoredToken(): string | null {
  console.warn(
    "getStoredToken() ne devrait pas être appelé. Le token est httpOnly et inaccessible au JS.",
  );
  return null;
}

/**
 * Supprime le token stocké.
 * Le cookie httpOnly est géré automatiquement par le serveur.
 */
export function clearStoredToken() {
  // Rien à faire, le cookie httpOnly est géré automatiquement
}

export { TOKEN_KEY };
