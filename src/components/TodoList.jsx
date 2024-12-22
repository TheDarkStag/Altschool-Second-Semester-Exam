import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const todosPerPage = 10;

  useEffect(() => {
    fetchTodos();
  }, [currentPage]);

  const fetchTodos = async () => {
    const existingToDos = JSON.parse(localStorage.getItem('todos'));
    if (existingToDos){
      console.log('yes');
      setTodos(existingToDos);
    }
    else{console.log('no')
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos`
          // `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${todosPerPage}`
        );
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    console.log(existingToDos, 'existingToDos');
    
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'pending') return !todo.completed;
      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="todos">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
            <Link to={`/todo/${todo.id}`} className="todo-title">
              {todo.title}
            </Link>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;