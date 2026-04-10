import {
  UploadImageResponse,
  DeleteImagesResponse,
  ApiError,
} from "../types/api-types";
import { fetchAPI } from "./fetch-api";

const API_URL = "/api/proxy";

/**
 * Envoie une image à l'API d'upload (FormData).
 * @param formData FormData contenant le fichier (champ `file`).
 */
export async function uploadImage(
  formData: FormData,
): Promise<UploadImageResponse> {
  const res = await fetch(`${API_URL}/uploads/image`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = (await res.json()) as UploadImageResponse | ApiError;
  if (!res.ok) {
    throw new Error((data as ApiError).error || res.statusText);
  }
  return data as UploadImageResponse;
}

/**
 * Supprime une ou plusieurs images.
 * @param payload Noms ou URLs des fichiers à supprimer.
 */
export async function deleteImages(payload: {
  filenames?: string[];
  urls?: string[];
  filename?: string;
  url?: string;
}): Promise<DeleteImagesResponse> {
  return fetchAPI<DeleteImagesResponse>(`/uploads/images`, {
    method: "DELETE",
    body: payload,
  });
}
