import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo, deleteTodo } from '../api/todoApi';
import type { Todo, TodoFilter } from '../types/todo';

export function useTodos(page: number, search: string) {
  return useQuery({
    queryKey: ['todos', page, search],
    queryFn: () => fetchTodos(page, 10, search)
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function filterTodos(todos: Todo[] | undefined, filter: TodoFilter): Todo[] {
  if (!todos) return [];
  
  return todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });
}