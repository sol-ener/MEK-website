import axios from 'axios';

const api = axios.create({
  baseURL: `https://0af0-170-205-30-219.ngrok-free.app/api/`,
});

export const aiAPI = axios.create({
  baseURL: `https://1685-34-196-129-223.ngrok-free.app/api/v1/`,
});

export default api;