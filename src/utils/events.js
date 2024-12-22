// Event management utilities
export const emitTodoUpdate = (todo) => {
  if (!todo || typeof todo !== 'object') return;
  
  const serializedTodo = {
    id: todo.id,
    title: todo.title,
    completed: !!todo.completed,
    userId: todo.userId
  };

  window.dispatchEvent(new CustomEvent('todoUpdated', {
    detail: serializedTodo
  }));
};