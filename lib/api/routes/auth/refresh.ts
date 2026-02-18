import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";
import * as RefreshRoute from "../../types/auth/refresh";

export function refresh(apiClient: ApiClient) {
  return () =>
    apiClient.post<BaseResponse<RefreshRoute.Response>>("/auth/refresh");
}
