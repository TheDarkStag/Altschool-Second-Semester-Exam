import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useTodoDetail } from '../hooks/useTodoDetail';

export default function TodoDetail() {
  const { id } = useParams();
  const { data: todo, isLoading, error } = useTodoDetail(id);

  if (isLoading) return (
    <div className="flex justify-center p-4 sm:p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
  if (error) throw error;
  if (!todo) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Todos
      </Link>

      <div className="glass-card rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">Todo #{todo.id}</h1>
          {todo.completed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" size={18} />
              <span className="text-sm sm:text-base">Completed</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="mr-2" size={18} />
              <span className="text-sm sm:text-base">Incomplete</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2">Title</h2>
            <p className="text-gray-700 text-sm sm:text-base">{todo.title}</p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2">User ID</h2>
            <p className="text-gray-700 text-sm sm:text-base">{todo.userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}