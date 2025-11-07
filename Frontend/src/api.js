import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const solveGpa = async (data) => {
  const res = await api.post('/solve', data);
  return res.data;
};
