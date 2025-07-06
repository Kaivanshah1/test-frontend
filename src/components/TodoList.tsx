import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import LoadingSpinner from './LoadingSpinner';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onClearError: () => void;
}

/**
 * Todo list component with filtering and statistics
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onToggle,
  onDelete,
  onClearError,
}) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-500">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-800">{error}</p>
          <button
            onClick={onClearError}
            className="ml-auto text-red-600 hover:text-red-700 underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <Circle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
        <p className="text-gray-500">Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Statistics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {completedCount} completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {totalCount - completedCount} remaining
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {totalCount} total
          </div>
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;