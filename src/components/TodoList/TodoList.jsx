import { useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { useFilter } from '../../hooks/useFilter';
import TodoListControls from './TodoListControls';
import AddTodoForm from './AddTodoForm';
import TestButtons from './TestButtons';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import BackToTop from './BackToTop';
import './TodoList.css';

const TodoList = () => {
  const {
    todos,
    addTodo,
    currentPage,
    isLoading,
    error,
    setCurrentPage,
    deleteTodo,
    updateTodoItem
  } = useTodos();

  const {
    filter,
    search,
    setFilter,
    setSearch,
    filteredItems: filteredTodos
  } = useFilter(todos);

  useEffect(() => {
    const handleTodoUpdate = (event) => {
      const updatedTodo = event.detail;
      updateTodoItem(updatedTodo.id, updatedTodo);
    };

    window.addEventListener('todoUpdated', handleTodoUpdate);
    return () => window.removeEventListener('todoUpdated', handleTodoUpdate);
  }, [updateTodoItem]);

  if (isLoading) return <div className="loading" role="status">Loading...</div>;
  if (error) return <div className="error" role="alert">Error: {error}</div>;

  return (
    <div className="todo-list">
      <TestButtons />

      <AddTodoForm todos={todos} onAddTodo={addTodo} />

      <TodoListControls
        search={search}
        filter={filter}
        onSearchChange={(e) => setSearch(e.target.value)}
        onFilterChange={(e) => setFilter(e.target.value)}
      />

      <h1 className="todo-list-heading">TODO LIST</h1>

      <div className="todos" role="list">
        {
          filteredTodos.map((todo, i) => (
            <TodoItem
              key={i}
              todo={todo}
              onDelete={deleteTodo}
            />
          ))
        }
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <BackToTop />
    </div>
  );
}
export default TodoList;