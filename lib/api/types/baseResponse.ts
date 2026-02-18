export type BaseResponse<T> = {
  status: number;
  timestamp: string;
  data: T;
};
