import api from './api';

export const getUserProfile = async (id) => {
  const res = await api.get(`/user/${id}`);
  return res.data;
};

export const updateUserProfile = async (id, userData) => {
  const res = await api.put(`/user/${id}`, userData);
  return res.data;
};
