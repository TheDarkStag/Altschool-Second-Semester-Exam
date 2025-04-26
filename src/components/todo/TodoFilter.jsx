import React from 'react';

const filters = [
  { value: 'all', label: 'All Tasks' },
  { value: 'completed', label: 'Completed' },
  { value: 'incomplete', label: 'Incomplete' }
];

export default function TodoFilter({ filter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${
            filter === value
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white/50 text-gray-600 hover:bg-white/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}