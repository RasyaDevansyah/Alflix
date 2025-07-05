# Alflix Backend - Refactored Structure

This backend has been refactored to follow a modular architecture pattern for better maintainability and organization.

## Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── db.js              # Database connection
│   ├── api.js             # API configuration
│   └── populateDB.js      # Database population scripts
├── controllers/           # Business logic controllers
│   ├── userController.js  # User-related operations
│   ├── movieController.js # Movie-related operations
│   └── subscriptionController.js # Subscription operations
├── middleware/            # Express middleware
│   ├── auth.js           # Authentication middleware
│   └── validation.js     # Input validation middleware
├── models/               # MongoDB models
│   ├── user.model.js     # User model
│   ├── userdetail.model.js # User details model
│   ├── movie.model.js    # Movie model
│   └── subscription.model.js # Subscription model
├── routes/               # API route definitions
│   ├── index.js          # Main routes index
│   ├── userRoutes.js     # User-related routes
│   ├── movieRoutes.js    # Movie-related routes
│   └── subscriptionRoutes.js # Subscription routes
├── utils/                # Utility functions
│   └── helpers.js        # Helper functions
├── server.js             # Main server file
└── README.md            # This file
```

## Architecture Overview

### Controllers
- **userController.js**: Handles user authentication, registration, profile management, favorites, and activity tracking
- **movieController.js**: Manages movie operations including trending, recommendations, and search
- **subscriptionController.js**: Handles subscription creation and retrieval

### Middleware
- **auth.js**: Authentication middleware to check if users are logged in
- **validation.js**: Input validation middleware for common patterns (ObjectId, email, username, password)

### Routes
- **userRoutes.js**: `/api/users/*` endpoints
- **movieRoutes.js**: `/api/movies/*` endpoints  
- **subscriptionRoutes.js**: `/api/subscription/*` and `/api/subscriptions/*` endpoints

### Utils
- **helpers.js**: Reusable utility functions like array shuffling, deduplication, and tag creation

## API Endpoints

### Authentication
- `GET /api/users/me` - Get current user info
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `POST /api/users/logout` - User logout

### User Management
- `GET /api/users/:userId/details` - Get user details
- `PUT /api/users/:userId/favorites` - Manage user favorites
- `PUT /api/users/:userId/activity` - Update user activity
- `PUT /api/users/:userId/subscription` - Update user subscription

### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/tags` - Get all movie tags
- `GET /api/movies` - Get movies with optional filtering
- `POST /api/movies` - Get movies with recommendations
- `GET /api/movies/:id` - Get specific movie details

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/subscription` - Create new subscription

## Key Features Preserved

All original functionality has been preserved:
- User authentication with session management
- Movie recommendations based on user preferences
- User activity tracking and watch history
- Favorites management
- Subscription handling
- Input validation and error handling

## Benefits of Refactoring

1. **Separation of Concerns**: Business logic is separated from route definitions
2. **Reusability**: Middleware and utility functions can be reused across routes
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Testability**: Controllers can be tested independently
5. **Scalability**: New features can be added without cluttering the main server file

## Running the Server

```bash
npm start
# or
node server.js
```

The server will run on `http://localhost:5000` by default. 