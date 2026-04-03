import {
  login,
  register,
  requestPasswordReset,
  resetPassword,
} from "@/services/auth";
import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  RequestResetInput,
  RequestResetResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
} from "@/types/api-types";
import { useAsyncAction } from "./base/useAsyncAction";

export function useRegister() {
  return useAsyncAction((input: RegisterInput) => register(input));
}

export function useLogin() {
  return useAsyncAction((input: LoginInput) => login(input));
}

export function useRequestPasswordReset() {
  return useAsyncAction((input: RequestResetInput) =>
    requestPasswordReset(input),
  );
}

export function useResetPassword() {
  return useAsyncAction((input: ResetPasswordInput) => resetPassword(input));
}
