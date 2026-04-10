import {
  AuthResponse,
  RegisterInput,
  LoginInput,
  RequestResetInput,
  ResetPasswordInput,
  RequestResetResponse,
  ResetPasswordResponse,
} from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Enregistre un nouvel utilisateur et renvoie le token + profil.
 * @param input Données d'inscription (nom, email, mot de passe, etc.).
 */
export async function register(input: RegisterInput): Promise<AuthResponse> {
  return fetchAPI<AuthResponse>("/auth/register", {
    method: "POST",
    body: input,
  });
}

/**
 * Authentifie un utilisateur existant.
 * @param input Email et mot de passe.
 */
export async function login(input: LoginInput): Promise<AuthResponse> {
  return fetchAPI<AuthResponse>("/auth/login", {
    method: "POST",
    body: input,
  });
}

/**
 * Demande l'envoi d'un lien de réinitialisation (réponse toujours ok pour éviter l'énumération).
 * @param input Email du compte ciblé.
 */
export async function requestPasswordReset(
  input: RequestResetInput,
): Promise<RequestResetResponse> {
  return fetchAPI<RequestResetResponse>(`/auth/request-reset`, {
    method: "POST",
    body: input,
  });
}

/**
 * Réinitialise le mot de passe à partir d'un token valable.
 * @param input Token reçu et nouveau mot de passe.
 */
export async function resetPassword(
  input: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  return fetchAPI<ResetPasswordResponse>(`/auth/reset-password`, {
    method: "POST",
    body: input,
  });
}
