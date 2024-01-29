export type SuccessResponse<R, M> = {
  code: string;
  message?: string;
  result: R;
  metadata: M;
};

export type ErrorResponse = {
  code: string;
  message: string;
};
