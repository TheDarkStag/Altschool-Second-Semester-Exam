import axios from 'axios';
import { handleApiError } from './errorHandling';
import { cacheTodo, getCachedTodo } from './todoCache';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodoById = async (id) => {
  const cachedTodo = getCachedTodo(id);
  if (cachedTodo) {
    return cachedTodo;
  }

  try {
    const response = await axios.get(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'fetch todo');
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todoData);
    const newTodo = { ...response.data, id: Date.now() }; // Generate client-side ID
    cacheTodo(newTodo);
    return newTodo;
  } catch (error) {
    throw handleApiError(error, 'create todo');
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    await axios.put(`${BASE_URL}/todos/${id}`, todoData);
    const updatedTodo = {
      ...todoData,
      id: parseInt(id)
    };
    cacheTodo(updatedTodo);
    return updatedTodo;
  } catch (error) {
    throw handleApiError(error, 'update todo');
  }
};

export const fetchTodos = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`, {
      params: { _page: page, _limit: limit }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'fetch todos');
  }
};

export const deleteTodoById = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`);
    return true;
  } catch (error) {
    throw handleApiError(error, 'delete todo');
  }
};