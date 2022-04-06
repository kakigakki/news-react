import axios from '@/utils/axios';

export const getRights = () => {
  return axios.get('/rights?_embed=children');
};
