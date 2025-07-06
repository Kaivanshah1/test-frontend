import React from 'react';
import { Check, X, Clock, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

/**
 * Individual todo item component
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id, !todo.completed)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {formattedDate}
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;