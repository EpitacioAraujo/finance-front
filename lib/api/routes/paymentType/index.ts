import { create } from "./create";
import { getAllPaymentTypes } from "./getAll";

export function paymentTypeRoutes(apiClient: any) {
  return {
    create: create(apiClient),
    getAll: getAllPaymentTypes(apiClient)
  };
}