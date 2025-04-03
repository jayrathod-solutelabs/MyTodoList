import { apiRequest } from './apiManager';
import { API_METHODS } from './apiMethods';
import { TASKS_ENDPOINT } from './endpoints';

/**
 * Test function to verify API connection is working
 * with the environment variables
 */
export const testApiConnection = async () => {
  try {
    // Try to fetch tasks to test the connection
    const tasks = await apiRequest(API_METHODS.GET, TASKS_ENDPOINT);
    console.log('API Connection successful!', tasks);
    return { success: true, data: tasks };
  } catch (error) {
    console.error('API Connection failed!', error);
    return { success: false, error };
  }
}; 