import axios from 'axios';

<<<<<<< HEAD
// Configuration for different environments
const getBaseURL = () => {
  // Check if we're in development (running locally)
  if (import.meta.env.DEV) {
    return 'http://localhost:8081/api';
  }
  
  // Production URL - Replace this with your actual Render.com backend URL
  // After deploying to Render, it will give you a URL like:
  // https://simplex-backend-xxxx.onrender.com
  return 'https://study-time-optimizer-6.onrender.com';
};

=======
>>>>>>> parent of 951686c (Refactor API setup and enhance error handling)
const api = axios.create({
  baseURL: 'https://simplex-backend-0y9o.onrender.com/api',  // Replace with your actual Render URL
});

export const solveGpa = async (data) => {
  const res = await api.post('/solve', data);
  return res.data;
};
