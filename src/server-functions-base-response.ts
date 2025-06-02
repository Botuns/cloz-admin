// base response for all server quireies actions and more

export interface ServerFunctionBaseResponse<T = unknown> {
  data?: T;
  error?: string;
  status?: number;
  message?: string;
  success?: boolean;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}
