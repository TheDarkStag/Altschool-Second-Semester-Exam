const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (page = 1, limit = 10, search = '') => {
  const response = await fetch(`${BASE_URL}/todos?_page=${page}&_limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  const todos = await response.json();
  
  if (search) {
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return todos;
};

export const fetchTodoById = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`);
  if (!response.ok) throw new Error('Failed to fetch todo');
  return response.json();
};

export const createTodo = async (title) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return true;
};