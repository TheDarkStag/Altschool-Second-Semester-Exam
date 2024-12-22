import React from 'react';
import { Link } from 'react-router-dom';
import './styles/TodoItem.css';

function TodoItem({ todo, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
      <Link to={`/todo/${todo.id}`} className="todo-title">
        {todo.title}
      </Link>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;