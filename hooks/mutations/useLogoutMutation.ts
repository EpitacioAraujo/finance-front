import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthContext } from "../contextProviders/AuthContextProvider";
import {
  alertSuccess,
  alertError,
  alertLoading,
  closeLoading,
} from "@/lib/alerts";

export function useLogoutMutation() {
  const { clearSession } = useAuthContext();

  const mutation = useMutation({
    mutationFn: async () => {
      alertLoading("Fazendo logout...", "Por favor aguarde.");
      await api.auth.logout();
    },
    onSuccess: () => {
      closeLoading();
      // 🔓 Limpar sessão após logout bem-sucedido
      clearSession();
      alertSuccess("Logout realizado", "Você foi desconectado com sucesso.");
    },
    onError: (error) => {
      closeLoading();
      console.error("Logout Error:", error);
      clearSession();
      alertSuccess("Logout realizado", "Você foi desconectado.");
    },
  });

  return mutation;
}
