# Full-Stack Todo Application

A modern, production-ready todo application built with React.js frontend and Node.js/Express backend.

## Features

### Frontend
- ✅ Clean, responsive UI with minimalist design
- ✅ Add new todos with title and optional description
- ✅ Mark todos as complete/incomplete
- ✅ Delete existing todos
- ✅ Form validation with helpful error messages
- ✅ Loading states and error handling
- ✅ Optimistic UI updates
- ✅ Real-time statistics (completed vs remaining)

### Backend
- ✅ RESTful API with proper HTTP status codes
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ CORS support for frontend connection
- ✅ Security headers with Helmet
- ✅ MVC architecture pattern

## Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **UUID** - ID generation
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **CORS** - Cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (port 5173) and backend (port 3001) servers concurrently.

3. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api/todos

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the frontend development server
- `npm run server` - Start only the backend server
- `npm run server:dev` - Start backend server with nodemon (auto-reload)
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build

## API Endpoints

### GET /api/todos
Retrieve all todos
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Todo title",
      "description": "Optional description",
      "completed": false,
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

### POST /api/todos
Create a new todo
```json
// Request body
{
  "title": "New todo",
  "description": "Optional description"
}

// Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "New todo",
    "description": "Optional description",
    "completed": false,
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

### PUT /api/todos/:id
Update a todo's completion status
```json
// Request body
{
  "completed": true
}

// Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Todo title",
    "description": "Description",
    "completed": true,
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

### DELETE /api/todos/:id
Delete a todo
```json
{
  "success": true,
  "data": {
    "message": "Todo deleted successfully"
  }
}
```

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── TodoForm.tsx   # Form for adding todos
│   │   ├── TodoItem.tsx   # Individual todo item
│   │   ├── TodoList.tsx   # List of todos
│   │   └── LoadingSpinner.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useTodos.ts    # Todo management hook
│   ├── services/          # API service layer
│   │   └── api.ts         # API client
│   ├── types/             # TypeScript type definitions
│   │   └── todo.ts        # Todo interfaces
│   ├── utils/             # Utility functions
│   │   └── validation.ts  # Form validation
│   └── App.tsx            # Main application component
├── server/                # Backend source code
│   ├── controllers/       # Route controllers
│   │   └── todoController.js
│   ├── models/            # Data models
│   │   └── todoModel.js
│   ├── routes/            # API routes
│   │   └── todoRoutes.js
│   ├── middleware/        # Custom middleware
│   │   └── errorHandler.js
│   ├── app.js             # Express app configuration
│   └── server.js          # Server startup
└── README.md
```

## Data Model

```typescript
interface Todo {
  id: string;           // UUID
  title: string;        // Required, 3-100 characters
  description?: string; // Optional, max 500 characters
  completed: boolean;   // Default: false
  createdAt: string;    // ISO timestamp
}
```

## Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **CORS Protection**: Configured for frontend origin
- **Security Headers**: Helmet middleware for security headers
- **Error Handling**: Comprehensive error handling without exposing sensitive information

## Production Considerations

This application uses in-memory storage for simplicity. For production deployment, consider:

- **Database**: Replace in-memory storage with PostgreSQL, MongoDB, or similar
- **Authentication**: Add user authentication and authorization
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Caching**: Add Redis or similar for caching
- **Monitoring**: Add application monitoring and logging
- **Environment Variables**: Use environment variables for configuration
- **Testing**: Add unit and integration tests

## License

This project is licensed under the MIT License.