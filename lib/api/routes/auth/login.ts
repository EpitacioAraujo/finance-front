import { ApiClient } from "../../types/ApiCliente";
import { BaseResponse } from "../../types/baseResponse";
import * as LoginRoute from "../../types/auth/login";

export function login(apiClient: ApiClient) {
  return (payload: LoginRoute.Payload) =>
    apiClient.post<BaseResponse<LoginRoute.Response>>("/auth/login", payload);
}
