/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T> = {
  status: number;
  data: T;
};

type Get = <T>(url: string) => Promise<T>;
type Post = <T, P = any>(url: string, data?: P) => Promise<Response<T>>;
type Put = <T, P = any>(url: string, data?: P) => Promise<Response<T>>;
type Delete = <T>(url: string) => Promise<Response<T>>;
type Patch = <T, P>(url: string, data?: P) => Promise<Response<T>>;

export type ApiClient = {
  get: Get;

  post: Post;

  put: Put;

  delete: Delete;

  patch: Patch;
};
