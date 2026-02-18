import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";
import * as MeRoute from "../../types/auth/me";

export function me(apiClient: ApiClient) {
  return () => apiClient.get<BaseResponse<MeRoute.Response>>("/auth/me");
}
