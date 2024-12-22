import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import TodoDetail from './components/TodoDetail/TodoDetail';
import NotFound from './pages/NotFound/NotFound';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {


  return (
    <Router>
      <div className="app">
        <header>
          <h1>Todo Manager</h1>
        </header>
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/todo/:id" element={<TodoDetail />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;