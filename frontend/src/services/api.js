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

// Add token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
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

// Syllabus APIs
export const syllabusAPI = {
  // Get all topics for logged-in user
  getAllTopics: async () => {
    const response = await api.get('/syllabus/all');
    return response.data;
  },
  
  // Add new topic
  addTopic: async (topicData) => {
    const response = await api.post('/syllabus/add', topicData);
    return response.data;
  },
  
  // Update topic status
  updateTopic: async (topicId, updateData) => {
    const response = await api.put(`/syllabus/${topicId}`, updateData);
    return response.data;
  },
  
  // Delete topic
  deleteTopic: async (topicId) => {
    const response = await api.delete(`/syllabus/${topicId}`);
    return response.data;
  }
};

export default api;