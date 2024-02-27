import axios from 'axios';

export const originURL = axios.create({
  baseURL: `/service/v1`,
});

export type BaseResponse<R, M> = {
  code: string;
  message?: string;
  result: R;
  metadata: M;
};
