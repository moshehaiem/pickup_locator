import axios, { AxiosInstance } from 'axios';
import { useCallback } from "react";

function useAxiosClient(): AxiosInstance {
  return useCallback(() => {
    const client = axios.create();
    client.interceptors.request.use((internalAxiosRequestConfig) => {
      return {
        ...internalAxiosRequestConfig,
        baseURL: process.env.REACT_APP_API_SERVER,
      };
    });
    return client;
  }, [])();
}

export default useAxiosClient