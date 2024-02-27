import { originURL } from '~/apis';

export const logoutAPI = async () => {
  return await originURL.get('/auth/logout');
};
