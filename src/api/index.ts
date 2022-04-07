import axios from '@/utils/axios';

//权限API
export const getRights = () => {
  return axios.get('/rights?_embed=children');
};

export const deleteRight = (id: number) => {
  return axios.delete(`/rights/${id}`);
};

export const toggleRight = (id: number, data: any) => {
  return axios.patch(`/rights/${id}`, data);
};

export const deleteRightChild = (id: number) => {
  return axios.get(`/children/${id}`);
};

export const toggleRightChild = (id: number, data: any) => {
  return axios.patch(`/children/${id}`, data);
};
