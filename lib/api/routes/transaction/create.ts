import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";

export function create(apiClient: ApiClient) {
  return (payload: {
    amount: number;
    description: string;
    date: string;
  }) =>
    apiClient.post<BaseResponse<void>>("/admin/transaction", payload);
}