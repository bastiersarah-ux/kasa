import { ACCESS_TOKEN_COOKIE } from "../helpers/auth-cookie";

const TOKEN_KEY = ACCESS_TOKEN_COOKIE;

/**
 * ⚠️ NE PAS utiliser cette fonction !
 * Le token est stocké dans un cookie httpOnly et n'est pas accessible au JavaScript.
 * C'est intentionnel pour la sécurité.
 *
 * Pour l'authentification, utilisez le contexte AuthContext qui gère sessionStorage.
 */
export function getStoredToken(): string | null {
  console.warn(
    "getStoredToken() ne devrait pas être appelé. Le token est httpOnly et inaccessible au JS.",
  );
  return null;
}

export function clearStoredToken() {
  // Rien à faire, le cookie httpOnly est géré automatiquement
}

export { TOKEN_KEY };
