import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update based on backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to all requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
