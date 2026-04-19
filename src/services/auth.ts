/**
 * @module auth
 * @description Service d'authentification.
 * Gère l'inscription, la connexion et la réinitialisation de mot de passe.
 */
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
 * Enregistre un nouvel utilisateur et renvoie le token JWT + profil.
 * @param input - Données d'inscription (nom, email, mot de passe, etc.)
 * @returns Le token d'authentification et le profil utilisateur
 */
export async function register(input: RegisterInput): Promise<AuthResponse> {
  return fetchAPI<AuthResponse>("/auth/register", {
    method: "POST",
    body: input,
  });
}

/**
 * Authentifie un utilisateur existant via email et mot de passe.
 * @param input - Identifiants de connexion (email, mot de passe)
 * @returns Le token d'authentification et le profil utilisateur
 */
export async function login(input: LoginInput): Promise<AuthResponse> {
  return fetchAPI<AuthResponse>("/auth/login", {
    method: "POST",
    body: input,
  });
}

/**
 * Demande l'envoi d'un email de réinitialisation de mot de passe.
 * La réponse est toujours positive pour éviter l'énumération de comptes.
 * @param input - Email du compte ciblé
 * @returns Confirmation de l'envoi
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
 * Réinitialise le mot de passe à partir d'un token de réinitialisation valide.
 * @param input - Token de réinitialisation et nouveau mot de passe
 * @returns Confirmation de la réinitialisation
 */
export async function resetPassword(
  input: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  return fetchAPI<ResetPasswordResponse>(`/auth/reset-password`, {
    method: "POST",
    body: input,
  });
}
