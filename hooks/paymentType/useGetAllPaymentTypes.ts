import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const QUERY_KEY_GET_ALL_PAYMENT_TYPES = "get-all-payment-types";

export function useGetAllPaymentTypes() {
    const query = useQuery({
        queryKey: [QUERY_KEY_GET_ALL_PAYMENT_TYPES],
        queryFn: async () => {
            return api.paymentType.getAll();
        },
    });

    return {
        data: query.data,
        isLoading: ["loading","idle"].includes(query.status),
        error: query.error,
        refetch: query.refetch,
    }
}