import axios from '@/utils/axios';

//权限API
export const listRights = () => {
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

//role API
export const listRoles = () => {
  return axios.get('/roles');
};

export const deleteRole = (id: number) => {
  return axios.delete(`/roles/${id}`);
};

export const changeRoleRight = (id: number, data: any) => {
  return axios.patch(`/roles/${id}`, data);
};

//user API
export const listUsers = () => {
  return axios.get('/users?_expand=role');
};

export const deleteUser = (id: number) => {
  return axios.delete(`/users/${id}`);
};
