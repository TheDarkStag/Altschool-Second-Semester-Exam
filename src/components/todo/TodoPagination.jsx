import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TodoPagination({ page, hasMore, onPageChange }) {
  return (
    <div className="mt-8 flex justify-center gap-4 items-center">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="px-4 py-2 bg-white/50 rounded-lg">Page {page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasMore}
        className="p-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}