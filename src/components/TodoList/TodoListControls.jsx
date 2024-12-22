import React from 'react';
import './TodoList.css';

function TodoListControls({ search, filter, onSearchChange, onFilterChange }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={onSearchChange}
        className="search-input"
      />
      <select
        value={filter}
        onChange={onFilterChange}
        className="filter-select"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}

export default TodoListControls;