// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // We no longer need withCredentials for token auth
  // withCredentials: true, 
  headers: {
    'Accept': 'application/json',
  }
});

// Check for a token in local storage on initial load
const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;