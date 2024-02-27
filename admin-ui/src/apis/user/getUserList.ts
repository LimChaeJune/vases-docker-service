import { originURL } from '~/apis';

export const getUserList = async () => {
  return await originURL.get('/user/list');
};
