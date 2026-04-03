import { deleteImages, uploadImage } from "@/services/uploads";
import { DeleteImagesResponse, UploadImageResponse } from "@/types/api-types";
import { getStoredToken } from "@/lib/auth-storage";
import { useAsyncAction } from "./useAsyncAction";

export function useUploadImage(token?: string) {
  return useAsyncAction((formData: FormData) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return uploadImage(formData, auth) as Promise<UploadImageResponse>;
  });
}

export function useDeleteImages(token?: string) {
  return useAsyncAction(
    (payload: {
      filenames?: string[];
      urls?: string[];
      filename?: string;
      url?: string;
    }) => {
      const auth = token ?? getStoredToken();
      if (!auth) return Promise.reject(new Error("Token manquant"));
      return deleteImages(payload, auth) as Promise<DeleteImagesResponse>;
    },
  );
}
