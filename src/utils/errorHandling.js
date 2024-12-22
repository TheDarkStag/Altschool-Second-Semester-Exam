// Error handling utilities
export const handleApiError = (error, operation) => {
  if (!error.response) {
    return new Error('Network error - please check your connection');
  }

  switch (error.response.status) {
    case 404:
      return new Error('Todo not found');
    case 400:
      return new Error('Invalid todo data');
    default:
      return new Error(`Failed to ${operation}: ${error.message}`);
  }
};