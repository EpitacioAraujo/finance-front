import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";
import { me } from "./me";
import { refresh } from "./refresh";

export function authRoutes(apiClient: any) {
  return {
    login: login(apiClient),
    register: register(apiClient),
    logout: logout(apiClient),
    me: me(apiClient),
    refresh: refresh(apiClient),
  };
}
