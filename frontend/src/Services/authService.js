import api from "./api";

export const loginUser = async ({ emailId, password }) => {
  const params = new URLSearchParams();
  params.append('emailId', emailId);
  params.append('password', password);
  const response = await api.post("/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return response.data;
};

export const signupUser = async (signupData) => {
  const response = await api.post("/signup", signupData);
  return response.data;
};