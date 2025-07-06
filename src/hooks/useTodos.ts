import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData } from '../types/todo';
import { TodoApiService } from '../services/api';

/**
 * Custom hook for managing todos state and operations
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch todos from the API
   */
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const todosData = await TodoApiService.getTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new todo
   */
  const createTodo = useCallback(async (todoData: TodoFormData) => {
    setError(null);
    
    try {
      const newTodo = await TodoApiService.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create todo';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Update todo completion status
   */
  const updateTodo = useCallback(async (id: string, completed: boolean) => {
    setError(null);
    
    // Optimistic update
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      )
    );

    try {
      await TodoApiService.updateTodo(id, completed);
    } catch (err) {
      // Revert optimistic update on error
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Delete a todo
   */
  const deleteTodo = useCallback(async (id: string) => {
    setError(null);
    
    // Optimistic update
    const originalTodos = todos;
    setTodos(prev => prev.filter(todo => todo.id !== id));

    try {
      await TodoApiService.deleteTodo(id);
    } catch (err) {
      // Revert optimistic update on error
      setTodos(originalTodos);
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
      throw err;
    }
  }, [todos]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError,
    refetch: fetchTodos,
  };
};