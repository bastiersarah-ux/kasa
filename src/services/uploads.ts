import {
  UploadImageResponse,
  DeleteImagesResponse,
  ApiError,
} from "../types/api-types";
import { API_BASE, buildHeaders, request } from "../lib/http";

/**
 * Envoie une image à l’API d’upload.
 * @param formData FormData contenant le fichier (champ `file`).
 * @param token JWT owner/admin.
 */
export async function uploadImage(
  formData: FormData,
  token?: string,
): Promise<UploadImageResponse> {
  const res = await fetch(`${API_BASE}/uploads/image`, {
    method: "POST",
    headers: buildHeaders(token),
    body: formData,
  });
  const data = (await res.json()) as UploadImageResponse | ApiError;
  if (!res.ok) {
    throw new Error((data as ApiError).error || res.statusText);
  }
  return data as UploadImageResponse;
}

/**
 * Supprime une ou plusieurs images.
 * @param payload Noms ou URLs des fichiers à supprimer (un ou plusieurs champs).
 * @param token JWT owner/admin autorisé à supprimer.
 */
export async function deleteImages(
  payload: {
    filenames?: string[];
    urls?: string[];
    filename?: string;
    url?: string;
  },
  token?: string,
): Promise<DeleteImagesResponse> {
  return request<DeleteImagesResponse>(`${API_BASE}/uploads/images`, {
    method: "DELETE",
    body: payload,
    headers: buildHeaders(token),
  });
}
