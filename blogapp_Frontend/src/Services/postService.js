import api from "./api";

export const getAllPosts = async () => {
  const res = await api.get("/posts/all");
  return res.data;
};

export const getPostsByCategory = async (category) => {
  const res = await api.get(`/posts/category/${category}`);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await api.post("/posts/create", postData);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/delete/${id}`);
  return res.data;
};