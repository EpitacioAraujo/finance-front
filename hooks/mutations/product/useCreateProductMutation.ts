import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Product } from "@/types/Products";
import {
  alertSuccess,
  alertError,
  alertLoading,
  closeLoading,
} from "@/lib/alerts";

export function useCreateProductMutation() {
  const mutation = useMutation({
    mutationFn: async (
      payload: Omit<Product, "id" | "createdAt" | "updatedAt">,
    ) => {
      alertLoading("Criando produto...", "Por favor aguarde.");
      return api.product.create(payload).then((response) => {
        return response.data;
      });
    },
    onSuccess: () => {
      closeLoading();
      alertSuccess("Produto criado!", "O produto foi adicionado ao catálogo.");
    },
    onError: (error) => {
      closeLoading();
      console.error("Create Product Error:", error);
      alertError(
        "Erro ao criar produto",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    },
  });

  return mutation;
}
