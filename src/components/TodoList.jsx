import React, { useState } from 'react';
import TodoItem from './todo/TodoItem';
import TodoFilter from './todo/TodoFilter';
import TodoSearch from './todo/TodoSearch';
import TodoPagination from './todo/TodoPagination';
import CreateTodo from './todo/CreateTodo';
import { useTodos, filterTodos, useCreateTodo, useDeleteTodo } from '../hooks/useTodos';
import { ListTodo } from 'lucide-react';

export default function TodoList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: todos, isLoading, error } = useTodos(page, search);
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCreateTodo = async (title) => {
    await createTodoMutation.mutateAsync(title);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) throw error;

  const filteredTodos = filterTodos(todos, filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-8">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <ListTodo className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
          <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-3 sm:ml-4">
            My Tasks
          </h1>
        </div>
        
        <CreateTodo onSubmit={handleCreateTodo} />
        
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <TodoSearch value={search} onChange={setSearch} />
          <TodoFilter filter={filter} onFilterChange={setFilter} />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              No todos found. Create one to get started!
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>

        {filteredTodos.length > 0 && (
          <TodoPagination
            page={page}
            hasMore={!!todos?.length}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}