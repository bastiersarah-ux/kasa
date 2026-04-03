import {
  createProperty,
  deleteProperty,
  getProperty,
  listProperties,
  updateProperty,
} from "@/services/properties";
import {
  CreatePropertyInput,
  PropertyDetails,
  PropertySummary,
  UpdatePropertyInput,
} from "@/types/api-types";
import { getStoredToken } from "@/lib/auth-storage";
import { useAsync } from "./base/useAsync";
import { useAsyncAction } from "./base/useAsyncAction";

export function useListProperties(enabled = true) {
  const result = useAsync<PropertySummary[]>(listProperties, [], { enabled });
  return { ...result, properties: result.data ?? [] };
}

export function useProperty(id?: string) {
  const result = useAsync<PropertyDetails>(
    () => getProperty(id as string),
    [id],
    { enabled: Boolean(id) },
  );
  return { ...result, property: result.data ?? null };
}

export function useCreateProperty(token?: string) {
  return useAsyncAction((input: CreatePropertyInput) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return createProperty(input, auth);
  });
}

export function useUpdateProperty(token?: string) {
  return useAsyncAction((id: string, input: UpdatePropertyInput) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return updateProperty(id, input, auth);
  });
}

export function useDeleteProperty(token?: string) {
  return useAsyncAction((id: string) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return deleteProperty(id, auth);
  });
}
