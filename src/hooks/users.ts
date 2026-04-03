import { createUser, getUser, listUsers, updateUser } from "@/services/users";
import {
  CreateUserInput,
  UpdateUserInput,
  UserListItem,
} from "@/types/api-types";
import { getStoredToken } from "@/lib/auth-storage";
import { useAsync } from "./base/useAsync";
import { useAsyncAction } from "./base/useAsyncAction";

export function useUsers(token?: string) {
  const result = useAsync<UserListItem[]>(
    () => listUsers(token ?? getStoredToken() ?? undefined),
    [token],
    { enabled: Boolean(token ?? getStoredToken()) },
  );
  return { ...result, users: result.data ?? [] };
}

export function useUser(id?: string | number, token?: string) {
  const result = useAsync<UserListItem>(
    () =>
      getUser(id as string | number, token ?? getStoredToken() ?? undefined),
    [id, token],
    { enabled: Boolean(id && (token ?? getStoredToken())) },
  );
  return { ...result, user: result.data ?? null };
}

export function useCreateUser(token?: string) {
  return useAsyncAction((input: CreateUserInput) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return createUser(input, auth);
  });
}

export function useUpdateUser(token?: string) {
  return useAsyncAction((id: string | number, input: UpdateUserInput) => {
    const auth = token ?? getStoredToken();
    if (!auth) return Promise.reject(new Error("Token manquant"));
    return updateUser(id, input, auth);
  });
}
