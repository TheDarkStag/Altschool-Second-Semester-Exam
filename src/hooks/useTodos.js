import { useState, useEffect } from 'react';
import { deleteTodoById, createTodo, updateTodo } from '../utils/api';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);

    const cachedTodos = localStorage.getItem('todos');
    if (cachedTodos) {
      setTodos(JSON.parse(cachedTodos));
      setIsLoading(false);
    }
    else {
      try {
        const response = await axios.get(`${BASE_URL}/todos`);
        setTodos(response.data);
        localStorage.setItem('todos', JSON.stringify(response.data));
      } catch (error) {
        setError('Failed to load todos');
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addTodo = async (newTodo) => {
    try {
      let created;
      const cachedTodos = localStorage.getItem('todos');
      
      if (cachedTodos) {
        const todos = JSON.parse(cachedTodos);
        // Ensure the new todo has a unique ID
        newTodo.id = Math.max(...todos.map(t => t.id), 0) + 1;
        created = newTodo;
        const updatedTodos = [created, ...todos];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        created = await createTodo(newTodo);
      }
      
      // Update state directly instead of reloading
      setTodos(prevTodos => [created, ...prevTodos]);
      return created;
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  };

  const updateTodoItem = async (id, updatedTodo) => {
    try {
      let updated;
      const cachedTodos = localStorage.getItem('todos');
      
      if (cachedTodos) {
        updated = updatedTodo;
        const todos = JSON.parse(cachedTodos);
        const updatedTodos = todos.map(todo => todo.id === id ? updated : todo);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        updated = await updateTodo(updatedTodo);
      }
      
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updated : todo));
      return updated;
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const cachedTodos = localStorage.getItem('todos');
      if (cachedTodos) {
        const todos = JSON.parse(cachedTodos);
        const updatedTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        await deleteTodoById(id);
      }
      
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodoItem,
    deleteTodo,
    refresh: loadTodos
  };
}