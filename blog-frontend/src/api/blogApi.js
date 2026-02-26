import api from './axios';

export const login = (emailId, password) => {
  const params = new URLSearchParams();
  params.append('emailId', emailId);
  params.append('password', password);
  return api.post('/api/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

export const signup = (userData) => api.post('/api/signup', userData);

export const getAllPosts = () => api.get('/api/posts/all');
export const getPostsByCategory = (category) => api.get(`/api/posts/category/${category}`);
export const createPost = (post) => api.post('/api/posts/create', post);
export const deletePost = (id) => api.delete(`/api/posts/delete/${id}`);

export const searchPosts = (query) => api.get(`/api/search?q=${encodeURIComponent(query)}`);
export const getSuggestions = (prefix) => api.get(`/api/search/suggest?prefix=${encodeURIComponent(prefix)}`);

export const getUserById = (id) => api.get(`/api/user/${id}`);
export const updateUserProfile = (id, data) => api.put(`/api/user/${id}`, data);
export const updatePassword = (id, oldPassword, newPassword) =>
  api.put(`/api/user/${id}/password`, { oldPassword, newPassword });
export const updateEmail = (id, newEmail) =>
  api.put(`/api/user/${id}/email`, { newEmail });

export const toggleLike = (postId, userId) =>
  api.post(`/api/interactions/like?postId=${postId}&userId=${userId}`);
export const addComment = (postId, userId, comment) =>
  api.post(`/api/interactions/comment?postId=${postId}&userId=${userId}&comment=${encodeURIComponent(comment)}`);

export const savePost = (userId, postId) => api.post(`/api/saved-posts/user/${userId}/post/${postId}`);
export const getSavedPosts = (userId) => api.get(`/api/saved-posts/user/${userId}`);

export const followUser = (followerId, followedUserId) =>
  api.post(`/api/follow?followerId=${followerId}&followedUserId=${followedUserId}`);
export const unfollowUser = (followerId, followedUserId) =>
  api.delete(`/api/follow?followerId=${followerId}&followedUserId=${followedUserId}`);
export const checkFollowing = (followerId, followedId) =>
  api.get(`/api/follow/check?followerId=${followerId}&followedId=${followedId}`);
export const getFollowers = (userId) => api.get(`/api/follow/followers?userId=${userId}`);
export const getFollowing = (userId) => api.get(`/api/follow/following?userId=${userId}`);
export const getFollowersCount = (userId) => api.get(`/api/follow/followers/count?userId=${userId}`);
export const getFollowingCount = (userId) => api.get(`/api/follow/following/count?userId=${userId}`);
