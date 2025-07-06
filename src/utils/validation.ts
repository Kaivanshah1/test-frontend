/**
 * Validation utilities for todo forms
 */
export const validateTodo = (title: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  
  if (title.trim().length < 3) {
    return 'Title must be at least 3 characters long';
  }
  
  if (title.trim().length > 100) {
    return 'Title must be less than 100 characters';
  }
  
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (description && description.length > 500) {
    return 'Description must be less than 500 characters';
  }
  
  return null;
};