const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (page: number = 1, limit: number = 10, search: string = '') => {
  const response = await fetch(`${BASE_URL}/todos?_page=${page}&_limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  const todos = await response.json();
  
  if (search) {
    return todos.filter((todo: any) => 
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return todos;
};

export const fetchTodoById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`);
  if (!response.ok) throw new Error('Failed to fetch todo');
  return response.json();
};

export const createTodo = async (title: string) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1, // Default userId
    }),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return true;
};