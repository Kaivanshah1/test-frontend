import { Todo, TodoFormData, ApiResponse } from '../types/todo';

const API_BASE_URL = 'https://test-backend-n1sq.onrender.com/api';

/**
 * API service for handling todo operations
 */
export class TodoApiService {
  /**
   * Fetch all todos from the API
   */
  static async getTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      const data: ApiResponse<Todo[]> = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch todos');
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  /**
   * Create a new todo
   */
  static async createTodo(todoData: TodoFormData): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      const data: ApiResponse<Todo> = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create todo');
      }
      
      return data.data!;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  /**
   * Update a todo's completion status
   */
  static async updateTodo(id: string, completed: boolean): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      const data: ApiResponse<Todo> = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update todo');
      }
      
      return data.data!;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  /**
   * Delete a todo
   */
  static async deleteTodo(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data: ApiResponse<null> = await response.json();
        throw new Error(data.error || 'Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}