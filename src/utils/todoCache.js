// Local cache for todos
const todoCache = new Map();

export const cacheTodo = (todo) => {
  if (todo && todo.id) {
    todoCache.set(todo.id.toString(), todo);
  }
};

export const getCachedTodo = (id) => {
  return todoCache.get(id.toString());
};

export const getCachedTodos = () => {
  return Array.from(todoCache.values());
};

export const clearCache = () => {
  todoCache.clear();
};