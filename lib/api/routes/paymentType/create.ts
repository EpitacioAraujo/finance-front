import { PaymentType } from "@/types/PaymentType";

export function create(apiClient: any) {
    return async (data: PaymentType) => {
        try {
            const response = await apiClient.post('/payment-types', data);
            return response.data;
        } catch (error) {
            console.error('Error creating payment type:', error);
            throw error;
        }
    }
}