import axios from 'axios';
import { API_METHODS } from './apiMethods';
import { API_BASE_URL, API_KEY } from '@env';

const apiManager = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
  });
  
  export const apiRequest = async <T>(
    method: keyof typeof API_METHODS,
    url: string,
    data?: T
  ): Promise<any> => {
    try {
      const response = await apiManager({
        method,
        url: `${url}?apikey=${API_KEY}`,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };