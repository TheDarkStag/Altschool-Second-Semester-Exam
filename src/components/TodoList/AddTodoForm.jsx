import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/AddTodoForm.css';

function AddTodoForm({todos, onAddTodo}) {
 
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        completed: false,
        id: todos?.length + 1
      });
      setTitle('');
    }
  };

  return (
    <div className="add-todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          maxLength={100}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
AddTodoForm.propTypes = {
  todos: PropTypes.array.isRequired,
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;