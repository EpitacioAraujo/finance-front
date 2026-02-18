import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";
import * as RegisterRoute from "../../types/auth/register";

export function register(apiClient: ApiClient) {
  return (payload: RegisterRoute.Payload) =>
    apiClient.post<BaseResponse<RegisterRoute.Response>>(
      "/auth/register",
      payload,
    );
}
