import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simplex-backend-0y9o.onrender.com/api',  // Replace with your actual Render URL
});

export const solveGpa = async (data) => {
  const res = await api.post('/solve', data);
  return res.data;
};
