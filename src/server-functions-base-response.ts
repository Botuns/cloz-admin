// base response for all server quireies actions and more

export interface ServerFunctionBaseResponse<T = unknown> {
  data?: T;
  error?: string;
  status?: 200 | 201 | 400 | 401 | 403 | 404 | 500;
  message?: string;
  success?: boolean;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}
