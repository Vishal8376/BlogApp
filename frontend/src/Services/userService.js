import api from './api';

export const getUserProfile = async (id) => {
  const res = await api.get(`/user/${id}`);
  return res.data;
};

export const updateUserProfile = async (id, userData) => {
  const res = await api.put(`/user/${id}`, userData);
  return res.data;
};

// --- Follow API ---

export const followUser = async (followerId, followedUserId) => {
  const res = await api.post('/follow', null, { params: { followerId, followedUserId } });
  return res.data;
};

export const unfollowUser = async (followerId, followedUserId) => {
  const res = await api.delete('/follow', { params: { followerId, followedUserId } });
  return res.data;
};

export const checkFollowing = async (followerId, followedId) => {
  const res = await api.get('/follow/check', { params: { followerId, followedId } });
  return res.data; // returns boolean
};

export const getFollowingList = async (userId) => {
  const res = await api.get('/follow/following', { params: { userId } });
  return res.data;
};

export const getFollowersList = async (userId) => {
  const res = await api.get('/follow/followers', { params: { userId } });
  return res.data;
};

export const getFollowingCount = async (userId) => {
  const res = await api.get('/follow/following/count', { params: { userId } });
  return res.data;
};

export const getFollowersCount = async (userId) => {
  const res = await api.get('/follow/followers/count', { params: { userId } });
  return res.data;
};
