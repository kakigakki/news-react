import axios from '@/utils/axios';

//权限API
export const getRights = () => {
  return axios.get('/rights?_embed=children');
};

export const deleteRight = (id: number) => {
  return axios.delete(`/rights/${id}`);
};

export const patchRight = (id: number) => {
  return axios.patch(`/rights/${id}`);
};

export const deleteRightChild = (id: number) => {
  return axios.get(`/children/${id}`);
};

export const patchRightChild = (id: number) => {
  return axios.get(`/rights/${id}`);
};
