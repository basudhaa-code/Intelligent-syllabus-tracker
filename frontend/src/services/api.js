import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getAllTopics = () => api.get('/syllabus/all');
export const addTopic = (topicData) => api.post('/syllabus/add', topicData);
export const updateTopic = (id, updateData) => api.put(`/syllabus/${id}`, updateData);
export const deleteTopic = (id) => api.delete(`/syllabus/${id}`);

export default api;