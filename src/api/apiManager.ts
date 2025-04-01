import axios from 'axios';
import { API_METHODS } from './apiMethods';

const API_BASE_URL = 'https://todos.simpleapi.dev/api';
const API_KEY = "8ca8821e-15ce-4a7a-bd52-51b7c63d5ec2";


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