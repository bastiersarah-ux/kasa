import {
  UserListItem,
  CreateUserInput,
  UpdateUserInput,
} from "../types/api-types";
import { API_BASE, buildHeaders, request } from "../lib/http";

/**
 * Liste les utilisateurs (admin requis).
 * @param token JWT admin.
 */
export async function listUsers(token?: string): Promise<UserListItem[]> {
  return request<UserListItem[]>(`${API_BASE}/users`, {
    headers: buildHeaders(token),
  });
}

/**
 * Récupère un utilisateur (self ou admin).
 * @param id Id utilisateur ciblé.
 * @param token JWT autorisé.
 */
export async function getUser(
  id: string | number,
  token?: string,
): Promise<UserListItem> {
  return request<UserListItem>(`${API_BASE}/users/${id}`, {
    headers: buildHeaders(token),
  });
}

/**
 * Crée un utilisateur (admin).
 * @param input Données du nouvel utilisateur.
 * @param token JWT admin.
 */
export async function createUser(
  input: CreateUserInput,
  token?: string,
): Promise<UserListItem> {
  return request<UserListItem>(`${API_BASE}/users`, {
    method: "POST",
    body: input,
    headers: buildHeaders(token),
  });
}

/**
 * Met à jour un utilisateur (self ou admin).
 * @param id Id utilisateur ciblé.
 * @param input Champs à modifier.
 * @param token JWT autorisé.
 */
export async function updateUser(
  id: string | number,
  input: UpdateUserInput,
  token?: string,
): Promise<UserListItem> {
  return request<UserListItem>(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    body: input,
    headers: buildHeaders(token),
  });
}
