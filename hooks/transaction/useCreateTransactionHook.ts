import { api } from "@/lib/api";
import { Payload } from "@/lib/api/types/transaction/create";
import { useMutation } from "@tanstack/react-query";

export function useCreateTransaction() {
    const mutation = useMutation({
        mutationFn: async (payload: Payload) => {
            const createTransaction = await api.transaction.create(payload)
            return createTransaction
        }
    })

    return {
        execute: mutation.mutateAsync,
        isLoading: ["loading","idle"].includes(mutation.status),
        error: mutation.error,
    }
}