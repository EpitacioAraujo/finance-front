import { create } from "./create";

export function transactionRoutes(apiClient: any) {
  return {
    create: create(apiClient),
  };
}