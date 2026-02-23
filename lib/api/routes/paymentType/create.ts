import { PaymentType } from "@/types/PaymentType";

export function create(apiClient: any) {
    return async (data: PaymentType) => {
        const response = await apiClient.post('/payment-types', data);
        return response.data;
    }
}