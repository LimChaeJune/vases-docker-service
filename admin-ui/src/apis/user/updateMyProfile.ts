import { originURL } from '~/apis';

export const updateMyProfile = async (payload: { name: string }) => {
  return await originURL.put('/user/profile', payload);
};
