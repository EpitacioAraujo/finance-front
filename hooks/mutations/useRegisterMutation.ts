import { useMutation } from "@tanstack/react-query";
import * as RegisterRoute from "@/lib/api/types/auth/register";
import { api } from "@/lib/api";
import {
  alertSuccess,
  alertError,
  alertLoading,
  closeLoading,
} from "@/lib/alerts";

export function useRegisterMutation() {
  const mutation = useMutation({
    mutationFn: async (payload: RegisterRoute.Payload) => {
      alertLoading("Criando conta...", "Por favor aguarde.");
      await api.auth.register(payload);
    },
    onSuccess: () => {
      closeLoading();
      alertSuccess(
        "Conta criada!",
        "Seu cadastro foi realizado com sucesso. Faça login para continuar.",
      );
    },
    onError: (error) => {
      closeLoading();
      console.error("Register Error:", error);
      alertError(
        "Erro ao criar conta",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    },
  });

  return mutation;
}
