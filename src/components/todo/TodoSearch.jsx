import React from 'react';
import { Search } from 'lucide-react';

export default function TodoSearch({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search tasks..."
        className="input-primary w-full pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  );
}