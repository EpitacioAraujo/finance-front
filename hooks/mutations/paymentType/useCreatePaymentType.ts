import { api } from "@/lib/api";
import { PaymentType } from "@/types/PaymentType";
import { useMutation } from "@tanstack/react-query";
import { exec } from "child_process";

export function useCreatePaymentType() {
  const mutation = useMutation({
    mutationKey: ["create-payment-type"],
    mutationFn: async (data: PaymentType) => {
      return api.paymentType.create(data);
    },
  });

  return {
    execute: mutation.mutate,
    isLoading: ["loading","idle"].includes(mutation.status),
    error: mutation.error,
  }
}
