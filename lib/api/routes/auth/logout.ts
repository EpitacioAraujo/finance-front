import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";
import * as LogoutRoute from "../../types/auth/logout";

export function logout(apiClient: ApiClient) {
  return () => apiClient.get<BaseResponse<LogoutRoute.Response>>("/auth/logout");
}
