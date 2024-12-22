import axios from 'axios';
import { handleApiError } from './errorHandling';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const todoService = {
  async update(id, todoData) {
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, todoData);
      return {
        ...todoData,
        id: parseInt(id)
      };
    } catch (error) {
      throw handleApiError(error, 'update todo');
    }
  }
};