import axios from 'axios';

// Configuration for different environments
const getBaseURL = () => {
  // Check if we're in development (running locally)
  if (import.meta.env.DEV) {
    return 'http://localhost:8081/api';
  }
  
  // Production URL - Replace this with your actual Render.com backend URL
  // After deploying to Render, it will give you a URL like:
  // https://simplex-backend-xxxx.onrender.com
  return 'https://simplex-backend-0y9o.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 second timeout for Render free tier
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server. Check if backend is running.');
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const solveGpa = async (data) => {
  try {
    const res = await api.post('/solve', data);
    return res.data;
  } catch (error) {
    console.error('Error in solveGpa:', error);
    throw error;
  }
};

export default api;
