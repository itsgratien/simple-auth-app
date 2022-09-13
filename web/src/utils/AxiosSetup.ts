import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI ?? 'http://localhost:4000/api/v1',
  withCredentials: true,
});

// register request interceptors
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  async (error: any) => {
    return await Promise.reject(error);
  },
);

// register response interceptors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

export default instance;
