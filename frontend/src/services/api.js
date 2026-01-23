// src/services/api.js
import axios from 'axios';

// Base URL of your backend server
const BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH APIs =================
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

// ================= SYLLABUS APIs =================
export const syllabusAPI = {
  getAllTopics: async () => {
    const response = await api.get('/syllabus/all');
    return response.data;
  },

  addTopic: async (topicData) => {
    const response = await api.post('/syllabus/add', topicData);
    return response.data;
  },

  updateTopic: async (topicId, updateData) => {
    const response = await api.put(`/syllabus/${topicId}`, updateData);
    return response.data;
  },

  deleteTopic: async (topicId) => {
    const response = await api.delete(`/syllabus/${topicId}`);
    return response.data;
  }
};

export default api;
