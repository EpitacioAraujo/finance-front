import { PaymentType } from "@/types/PaymentType";

export function getAllPaymentTypes(apiClient: any)  {
    return async () => {
        const result = await apiClient.get('/payment-types');
        return result.data as PaymentType[];
    };
}