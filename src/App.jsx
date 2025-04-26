import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ListTodo, Menu, X } from 'lucide-react';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import NotFound from './pages/NotFound';
import ErrorTest from './pages/ErrorTest';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link to="/" className="flex items-center">
                      <ListTodo className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      <span className="ml-2 text-lg sm:text-xl font-bold">Todo App</span>
                    </Link>
                  </div>
                  <div className="hidden sm:flex items-center">
                    <Link
                      to="/error-test"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Test Error
                    </Link>
                  </div>
                  <div className="sm:hidden flex items-center">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
              </div>
              {/* Mobile menu */}
              {isMenuOpen && (
                <div className="sm:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                      to="/error-test"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Test Error
                    </Link>
                  </div>
                </div>
              )}
            </nav>

            <main className="py-4 sm:py-8">
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todo/:id" element={<TodoDetail />} />
                <Route path="/error-test" element={<ErrorTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;