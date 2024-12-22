import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorTrigger from './ErrorTrigger';
import './styles/TestButtons.css';

function TestButtons() {
  const navigate = useNavigate();

  return (
    <div className="test-buttons">
      <button 
        className="test-button test-404"
        onClick={() => navigate('/non-existent-page')}
      >
        Test 404 Page
      </button>
      <ErrorTrigger />
    </div>
  );
}

export default TestButtons;