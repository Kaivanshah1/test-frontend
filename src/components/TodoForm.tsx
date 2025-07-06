import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { validateTodo, validateDescription } from '../utils/validation';
import LoadingSpinner from './LoadingSpinner';

interface TodoFormProps {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
  loading?: boolean;
}

/**
 * Form component for creating new todos
 */
const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const titleError = validateTodo(title);
    const descriptionError = validateDescription(description);
    
    if (titleError || descriptionError) {
      setErrors({
        title: titleError || undefined,
        description: descriptionError || undefined,
      });
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      
      // Reset form on success
      setTitle('');
      setDescription('');
      setErrors({});
    } catch (error) {
      // Error handling is managed by the parent component
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter todo title..."
          disabled={loading}
        />
        {errors.title && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.title}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter todo description..."
          disabled={loading}
        />
        {errors.description && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.description}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;