/**
 * @module users
 * @description Service de gestion des profils utilisateurs.
 */
import { AuthUser, UpdateUserInput, UserListItem } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Récupère le profil de l'utilisateur actuellement connecté.
 * @returns Profil complet de l'utilisateur authentifié
 */
export async function getCurrentUser(): Promise<AuthUser> {
  return fetchAPI<AuthUser>(`/auth/me`);
}

/**
 * Met à jour le profil de l'utilisateur connecté.
 * @param input - Champs à modifier (nom, photo, rôle)
 * @returns Profil mis à jour
 */
export async function updateCurrentUser(
  input: UpdateUserInput,
): Promise<AuthUser> {
  return fetchAPI<AuthUser>(`/auth/me`, {
    method: "PATCH",
    body: input,
  });
}

/**
 * Change le mot de passe de l'utilisateur connecté.
 * @param currentPassword - Mot de passe actuel pour vérification
 * @param newPassword - Nouveau mot de passe souhaité
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  await fetchAPI<void>(`/auth/change-password`, {
    method: "POST",
    body: { currentPassword, newPassword },
  });
}

/**
 * Récupère le profil public d'un utilisateur par son identifiant.
 * @param userId - Identifiant de l'utilisateur
 * @returns Profil de l'utilisateur
 */
export async function getUserById(userId: string): Promise<UserListItem> {
  return fetchAPI<UserListItem>(`/users/${userId}`);
}
