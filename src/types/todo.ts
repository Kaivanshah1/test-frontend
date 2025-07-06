/**
 * Todo data model interface
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

/**
 * API response wrapper interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Form data interface for creating/updating todos
 */
export interface TodoFormData {
  title: string;
  description?: string;
}