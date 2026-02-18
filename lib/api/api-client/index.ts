import { AxiosApiClient } from "./axios-api-client";
export type { Response } from "./axios-api-client";

export const apiClient = new AxiosApiClient();

/**
 * Registra um callback para ser chamado quando ocorrer erro 401 (Unauthorized)
 */
export function setUnauthorizedHandler(callback: () => void) {
  apiClient.setOnUnauthorized(callback);
}
