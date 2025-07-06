import React from 'react';
import { ListTodo } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

/**
 * Main application component
 */
function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ListTodo className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">
            Stay organized and get things done with our simple todo manager
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Todo Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Todo
              </h2>
              <TodoForm onSubmit={createTodo} loading={loading} />
            </div>
          </div>

          {/* Todo List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Todos
              </h2>
              <TodoList
                todos={todos}
                loading={loading}
                error={error}
                onToggle={updateTodo}
                onDelete={deleteTodo}
                onClearError={clearError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;