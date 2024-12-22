import React, { useState, useEffect } from 'react';
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
  const { todos, addTodo, isLoading, error, deleteTodo, updateTodoItem } = useTodos();
  const { filter, search, setFilter, setSearch, filteredItems: filteredTodos } = useFilter(todos);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const totalPages = Math.ceil(filteredTodos.length / pageSize);
  const paginatedTodos = filteredTodos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    // Reset to the first page if the filter changes
    setCurrentPage(1);
  }, [filter, search]);

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
        {paginatedTodos.map((todo, i) => (
          <TodoItem key={i} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <BackToTop />
    </div>
  );
};

export default TodoList;
