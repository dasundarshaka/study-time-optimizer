import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8081/api';
  }
  return 'https://study-time-optimizer-6.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

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

api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response from server. Check if backend is running.');
      alert('Cannot connect to server. The backend might be starting up (this can take up to 1 minute on Render free tier).');
    } else {
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