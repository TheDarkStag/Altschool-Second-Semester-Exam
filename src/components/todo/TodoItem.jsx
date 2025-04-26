import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronRight } from 'lucide-react';

export default function TodoItem({ todo, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await onDelete(todo.id);
    }
  };

  return (
    <Link
      to={`/todo/${todo.id}`}
      className="group block glass-card rounded-xl p-4 hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="h-5 w-5 rounded border-gray-300 text-purple-600 
                         focus:ring-purple-500 transition-colors duration-200"
            />
            {todo.completed && (
              <div className="absolute inset-0 bg-purple-600 rounded opacity-20"></div>
            )}
          </div>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {todo.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-600 p-1 rounded-lg 
                     transition-colors duration-200 opacity-0 group-hover:opacity-100"
            title="Delete todo"
          >
            <Trash2 size={18} />
          </button>
          <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
        </div>
      </div>
    </Link>
  );
}