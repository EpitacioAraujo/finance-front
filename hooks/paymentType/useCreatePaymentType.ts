import { api } from "@/lib/api";
import { BaseError } from "@/lib/api/types/BaseError";
import { PaymentType } from "@/types/PaymentType";
import { useMutation } from "@tanstack/react-query";

export function useCreatePaymentType() {
  const mutation = useMutation<unknown, BaseError, PaymentType>({
    mutationKey: ["create-payment-type"],
    mutationFn: async (data: PaymentType) => {
      return await api.paymentType.create(data);
    },
  });

  return {
    execute: mutation.mutateAsync,
    isLoading: ["loading","idle"].includes(mutation.status),
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  }
}
