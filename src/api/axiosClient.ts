import axios, { type InternalAxiosRequestConfig } from 'axios';

export const axiosClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = 'Bearer mock-token';
  return config;
});
