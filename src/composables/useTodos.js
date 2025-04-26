import { ref, computed } from 'vue';
import { useLocalStorage } from './useLocalStorage';
import { fetchTodos, createTodo, deleteTodo, updateTodo } from '../api/todoApi';

export function useTodos() {
  const todos = useLocalStorage('todos', []);
  const isLoading = ref(true);
  const error = ref(null);

  // Fetch initial todos from API
  const initializeTodos = async () => {
    try {
      const apiTodos = await fetchTodos(1, 10);
      todos.value = apiTodos;
      isLoading.value = false;
    } catch (err) {
      error.value = err;
      isLoading.value = false;
    }
  };

  // Create todo
  const addTodo = async (title) => {
    try {
      const newTodo = await createTodo(title);
      todos.value = [newTodo, ...todos.value];
      return newTodo;
    } catch (err) {
      error.value = err;
      throw err;
    }
  };

  // Delete todo
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (err) {
      error.value = err;
      throw err;
    }
  };

  // Update todo
  const updateTodoItem = async (id, updates) => {
    try {
      const updatedTodo = await updateTodo(id, updates);
      todos.value = todos.value.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      );
      return updatedTodo;
    } catch (err) {
      error.value = err;
      throw err;
    }
  };

  // Filter todos
  const filterTodos = (todos, filter) => {
    return todos.filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'incomplete') return !todo.completed;
      return true;
    });
  };

  return {
    todos,
    isLoading,
    error,
    initializeTodos,
    addTodo,
    removeTodo,
    updateTodoItem,
    filterTodos
  };
}