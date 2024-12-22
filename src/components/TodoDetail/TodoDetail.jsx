/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../../hooks/useTodos';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const {
    updateTodoItem
  } = useTodos();


  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const storedTodosList = JSON.parse(localStorage.getItem('todos'));
        if (storedTodosList) {
          const todo = storedTodosList.find(todo => todo.id === parseInt(id));
          if (todo) {
            setTodo(todo);
            setEditedTitle(todo.title);
            return;
          }
        }
        else {
          throw new Error('Todos list not found in local storage');
        }
      } catch (error) {
        navigate('/404');
      }
    };
    fetchTodo();
  }, [id]);



  const handleUpdate = async () => {
    try {
     
      const updatedTodo = {
        ...todo,
        title: editedTitle,
      };
      updateTodoItem(updatedTodo.id, updatedTodo);
      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="todo-detail">
      <h2>Todo Details</h2>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="todo-info">
          <h3>{todo.title}</h3>
          <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => navigate('/')}>Back to List</button>
        </div>
      )}
    </div>
  );
}

export default TodoDetail;