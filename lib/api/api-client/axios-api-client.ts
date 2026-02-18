/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3301";

export type Response<T> = {
  status: number;
  data: T;
};

export class AxiosApiClient {
  private client: AxiosInstance;
  // Callback global para quando a sessão estiver inválida
  private onUnauthorized: (() => void) | null = null;
  // Promessa compartilhada para evitar múltiplos refresh simultâneos
  private refreshPromise: Promise<void> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Request interceptor (mantido para futuras extensões)
    this.client.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    );

    // Response interceptor: tenta refresh no 401 e repete a requisição original
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as (InternalAxiosRequestConfig & {
          _retry?: boolean;
        }) | undefined;

        // Se não for 401 ou não tiver request original, propaga erro
        if (!originalRequest || error.response?.status !== 401) {
          return Promise.reject(error);
        }

        // Evita loop: não tenta refresh se o 401 veio do /auth/refresh
        // ou se a requisição já foi reexecutada uma vez
        if (originalRequest.url?.includes("/auth/refresh") || originalRequest._retry) {
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
          return Promise.reject(
            new Error("Não autorizado. Por favor, faça login novamente."),
          );
        }

        // Marca a requisição para não repetir indefinidamente
        originalRequest._retry = true;

        try {
          // Se não houver refresh em andamento, inicia um
          if (!this.refreshPromise) {
            this.refreshPromise = this.refreshSession();
          }

          // Aguarda o refresh concluir e repete a requisição original
          await this.refreshPromise;
          return this.client(originalRequest);
        } catch (refreshError) {
          // Refresh falhou, dispara handler global de não autorizado
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
          return Promise.reject(refreshError);
        } finally {
          // Libera a promessa para futuras tentativas
          this.refreshPromise = null;
        }
      },
    );
  }

  setOnUnauthorized(callback: () => void) {
    this.onUnauthorized = callback;
  }

  // Faz refresh do access token via cookie HttpOnly
  private async refreshSession(): Promise<void> {
    await this.client.post("/auth/refresh");
  }

  get axios() {
    return this.client;
  }

  get<T>(url: string): Promise<T> {
    return this.client.get<T>(url).then((response) => response.data);
  }

  post<T, P = any>(url: string, data?: P): Promise<Response<T>> {
    return this.client.post<T>(url, data).then((response) => ({
      status: response.status,
      data: response.data,
    }));
  }

  put<T, P = any>(url: string, data?: P): Promise<Response<T>> {
    return this.client.put<T>(url, data).then((response) => ({
      status: response.status,
      data: response.data,
    }));
  }

  delete<T>(url: string): Promise<Response<T>> {
    return this.client.delete<T>(url).then((response) => ({
      status: response.status,
      data: response.data,
    }));
  }

  patch<T, P>(url: string, data?: P): Promise<Response<T>> {
    return this.client.patch<T>(url, data).then((response) => ({
      status: response.status,
      data: response.data,
    }));
  }
}
