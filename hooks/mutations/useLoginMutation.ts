import { useMutation } from "@tanstack/react-query";
import * as LoginRoute from "@/lib/api/types/auth/login";
import { api } from "@/lib/api";
import { useAuthContext } from "../contextProviders/AuthContextProvider";
import {
  alertSuccess,
  alertError,
  alertLoading,
  closeLoading,
} from "@/lib/alerts";

export function useLoginMutation() {
  const { refreshSession } = useAuthContext();

  const mutation = useMutation({
    mutationFn: async (payload: LoginRoute.Payload) => {
      alertLoading("Fazendo login...", "Por favor aguarde.");
      return api.auth.login(payload);
    },
    onSuccess: async () => {
      closeLoading();
      await refreshSession();
      alertSuccess("Bem vindo!", "Login realizado com sucesso.");
    },
    onError: (error) => {
      closeLoading();
      console.error("Login Error:", error);
      alertError(
        "Erro ao fazer login",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    },
  });

  return mutation;
}
