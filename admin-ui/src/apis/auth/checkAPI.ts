import { originURL } from '~/apis';

export const authCheckAPI = async () => {
  return await originURL.get('/auth/check');
};
