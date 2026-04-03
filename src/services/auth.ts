import {
  AuthResponse,
  RegisterInput,
  LoginInput,
  RequestResetInput,
  ResetPasswordInput,
  RequestResetResponse,
  ResetPasswordResponse,
} from "../types/api-types";
import { AUTH_BASE, request } from "../lib/http";
import { setStoredToken } from "../lib/auth-storage";

/**
 * Enregistre un nouvel utilisateur et renvoie le token + profil.
 * @param input Données d’inscription (nom, email, mot de passe, etc.).
 */
export async function register(input: RegisterInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>(`${AUTH_BASE}/register`, {
    method: "POST",
    body: input,
  });
  setStoredToken(res.token);
  return res;
}

/**
 * Authentifie un utilisateur existant.
 * @param input Email et mot de passe.
 */
export async function login(input: LoginInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>(`${AUTH_BASE}/login`, {
    method: "POST",
    body: input,
  });
  setStoredToken(res.token);
  return res;
}

/**
 * Demande l’envoi d’un lien de réinitialisation (réponse toujours ok pour éviter l’énumération).
 * @param input Email du compte ciblé.
 */
export async function requestPasswordReset(
  input: RequestResetInput,
): Promise<RequestResetResponse> {
  return request<RequestResetResponse>(`${AUTH_BASE}/request-reset`, {
    method: "POST",
    body: input,
  });
}

/**
 * Réinitialise le mot de passe à partir d’un token valable.
 * @param input Token reçu et nouveau mot de passe.
 */
export async function resetPassword(
  input: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  return request<ResetPasswordResponse>(`${AUTH_BASE}/reset-password`, {
    method: "POST",
    body: input,
  });
}
