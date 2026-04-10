import { AuthUser, UpdateUserInput, UserListItem } from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/**
 * Récupère le profil de l'utilisateur actuel.
 */
export async function getCurrentUser(): Promise<AuthUser> {
  return fetchAPI<AuthUser>(`/auth/me`);
}

/**
 * Met à jour le profil de l'utilisateur actuel.
 * @param input Champs à modifier.
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
 * Change le mot de passe de l'utilisateur.
 * @param currentPassword Mot de passe actuel.
 * @param newPassword Nouveau mot de passe.
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
 * Récupère le profil d'un utilisateur par son ID.
 * @param userId Identifiant d'utilisateur.
 */
export async function getUserById(userId: string): Promise<UserListItem> {
  return fetchAPI<UserListItem>(`/users/${userId}`);
}
