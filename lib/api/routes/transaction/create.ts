import { ApiClient } from "@/lib/api/types/ApiCliente";
import { BaseResponse } from "@/lib/api/types/baseResponse";

import { Payload } from "@/lib/api/types/transaction/create";

export function create(apiClient: ApiClient) {
  return (payload: Payload) =>
    apiClient.post<BaseResponse<void>>("/admin/transaction", payload);
}