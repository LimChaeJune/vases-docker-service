import { originURL } from '~/apis';

export const loginAPI = async (payload: { email: string; pwd: string }) => {
  return await originURL.post('/auth/login', payload);
};
