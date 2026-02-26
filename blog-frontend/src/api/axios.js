import axios from 'axios';

const api = axios.create({
  baseURL: '',  // Uses Vite proxy → http://localhost:8090
  withCredentials: true,
});

export default api;
