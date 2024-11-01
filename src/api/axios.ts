import axios from 'axios';
import { environment } from 'config/environment';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: environment.baseURL,
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - Redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
export default api;
