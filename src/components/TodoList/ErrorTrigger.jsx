import React, { useState } from 'react';
import './styles/TestButtons.css';

function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error for the Error Boundary!');
  }

  return (
    <button 
      className="test-button test-error"
      onClick={() => setShouldError(true)}
    >
      Test Error Boundary
    </button>
  );
}

export default ErrorTrigger;