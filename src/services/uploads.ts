/**
 * @module uploads
 * @description Service d'upload et de suppression d'images.
 */
import {
  UploadImageResponse,
  DeleteImagesResponse,
  ApiError,
} from "../types/api-types";
import { fetchAPI } from "./fetch-api";

/** URL de base du proxy API Next.js */
const API_URL = "/api/proxy";

/**
 * Envoie une image au serveur via le proxy.
 * Utilise FormData pour le multipart/form-data.
 * @param formData - FormData contenant le fichier dans le champ `file`
 * @returns Informations sur l'image uploadée (URL, nom, taille, etc.)
 * @throws {Error} Si l'upload échoue
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
 * Supprime une ou plusieurs images du serveur.
 * Accepte des noms de fichiers ou des URLs.
 * @param payload - Fichiers à supprimer (par nom ou URL)
 * @returns Résultat détaillé de la suppression
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
