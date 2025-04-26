import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '../api/todoApi';

export function useTodoDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id!),
    enabled: !!id
  });
}