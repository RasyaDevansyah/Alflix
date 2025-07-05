# 🎬 Alflix - Streaming Service Platform

A full-stack MERN streaming service platform built with React, Node.js, Express, MongoDB, and Tailwind CSS. Alflix provides a Netflix-like experience with user authentication, subscription management, video streaming, and an intuitive user interface.

![image](https://github.com/user-attachments/assets/4ead91c9-b1c9-4140-91be-12bf4cdd367e)


## 👥 Team

1. Christian Setiawan - 2702221570
2. Michelle Daphne Langitan - 2702221425
3. Muhammad Rasya Devansyah - 2702223254
4. Farrel Raynandi Putra - 2702234763
5. Gregorius William Koswari - 2702240701

This project was developed as a collaborative effort for Software Engineering coursework.


## ✨ Features

### 🎥 Video Streaming
- **Video Playback**: High-quality video streaming with React Player
- **Movie Information**: Detailed movie pages with cast information, ratings, and descriptions
- **Categories & Tags**: Browse movies by categories and tags
- **Search Functionality**: Advanced search with filters and results

### 👤 User Management
- **Authentication**: Secure user registration and login system
- **User Profiles**: Personalized user profiles with viewing history
- **Session Management**: Persistent sessions with MongoDB store

### 💳 Subscription System
- **Multiple Plans**: Various subscription tiers with different pricing
- **Payment Integration**: Secure payment processing
- **Plan Benefits**: Detailed benefits for each subscription level

### 🎨 User Interface
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Modern UI**: Clean and intuitive user interface
- **Navigation**: Smooth navigation with React Router
- **Analytics**: User analytics and viewing statistics

### 🔍 Content Discovery
- **Browse Page**: Comprehensive movie browsing experience
- **Trending Section**: Featured and trending content
- **Related Movies**: Smart recommendations based on viewing history
- **History Tracking**: User viewing history and progress

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Player** - Video player component
- **Recharts** - Data visualization charts

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Session** - Session management
- **Cookie Parser** - Cookie handling
- **Connect Mongo** - Session store for MongoDB

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-restart
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/RasyaDevansyah/Alflix
   cd Alflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   NODE_ENV=development
   PORT=5000
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create collections on first run
   - You can use the `populateDB.js` script to add sample data

## 🗄️ Database Import Instructions

### Option 1: Using MongoDB Atlas (Recommended)

#### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (M0 Free tier is sufficient)
3. Set up database access with a username and password
4. Configure network access (allow access from anywhere: `0.0.0.0/0`)
5. Get your connection string from the "Connect" button

#### Step 2: Install MongoDB Database Tools
Download and install MongoDB Database Tools from [MongoDB Download Center](https://www.mongodb.com/try/download/database-tools)

**Windows:**
```bash
# Download the zip file and extract to C:\Program Files\MongoDB\Tools\bin
# Add to PATH: C:\Program Files\MongoDB\Tools\bin
```

**macOS:**
```bash
brew install mongodb/brew/mongodb-database-tools
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-database-tools
```

#### Step 3: Import Sample Data

1. **Navigate to the sample_database directory:**
   ```bash
   cd sample_database
   ```

2. **Import movies collection:**
   ```bash
   mongoimport --uri "your_mongodb_atlas_connection_string" --collection movies --file movies.json --jsonArray
   ```

3. **Import subscriptions collection:**
   ```bash
   mongoimport --uri "your_mongodb_atlas_connection_string" --collection subscriptions --file subscriptions.json --jsonArray
   ```

#### Step 4: Verify Import
1. Go to MongoDB Atlas dashboard
2. Click on "Browse Collections"
3. You should see two collections: `movies` and `subscriptions`
4. Check that the documents are imported correctly

### Option 2: Using Local MongoDB

#### Step 1: Install Local MongoDB
Follow the [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

#### Step 2: Start MongoDB Service
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

#### Step 3: Import Data
```bash
# Navigate to sample_database directory
cd sample_database

# Import movies
mongoimport --db alflix --collection movies --file movies.json --jsonArray

# Import subscriptions
mongoimport --db alflix --collection subscriptions --file subscriptions.json --jsonArray
```

### Option 3: Using MongoDB Compass (GUI)

1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your MongoDB instance (local or Atlas)
3. Create a new database called `alflix`
4. Create two collections: `movies` and `subscriptions`
5. Use the "Add Data" → "Import File" feature for each JSON file

### 📊 Database Schema Overview

#### Movies Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "poster": "String (URL)",
  "description": "String",
  "rating": "Number",
  "video": "String (YouTube URL)",
  "imgHeader": "String (URL)",
  "imgSubheader": "String (URL)",
  "year": "Number",
  "quote": "String",
  "tags": [
    {
      "id": "Number",
      "name": "String",
      "_id": "ObjectId"
    }
  ],
  "cast": [
    {
      "castPicture": "String (URL)",
      "actorName": "String",
      "roleName": "String",
      "_id": "ObjectId"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Subscriptions Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "benefits": ["String"],
  "normalPrice": "Number",
  "discountedPrice": "Number"
}
```

### 🔧 Troubleshooting

#### Common Issues:

1. **Connection String Format:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   ```

2. **Authentication Error:**
   - Ensure username and password are correct
   - Check if IP address is whitelisted in Atlas

3. **Import Errors:**
   - Verify JSON files are valid
   - Check file paths are correct
   - Ensure sufficient permissions

4. **Collection Already Exists:**
   ```bash
   # Drop existing collection first
   mongoimport --uri "your_connection_string" --collection movies --file movies.json --jsonArray --drop
   ```

### 📈 Sample Data Statistics

- **Movies Collection**: ~1,000+ movies with complete metadata
- **Subscriptions Collection**: 3 subscription plans
- **Total Data Size**: ~1.1MB
- **Features**: Cast information, ratings, categories, video links

## 🚀 Running the Application

### Development Mode
```bash
# Start the backend server
npm run backend

# In a new terminal, start the frontend development server
npm run dev
```

### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

The application will be available at:
- **Development**: http://localhost:5173 (frontend) + http://localhost:5000 (backend)
- **Production**: http://localhost:5000

## 📁 Project Structure

```
Alflix/
├── backend/
│   ├── config/          # Database and API configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication and validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── assets/      # Static assets
│   │   └── App.jsx      # Main app component
│   └── index.html       # HTML template
├── sample_database/     # Sample data for import
│   ├── movies.json      # Movies collection data
│   └── subscriptions.json # Subscriptions collection data
└── package.json         # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/tags` - Get all movie tags

### Subscriptions
- `GET /api/subscriptions` - Get subscription plans
- `POST /api/subscription/purchase` - Purchase subscription

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/history` - Get viewing history

## 🎯 Key Features Implementation

### Video Streaming
- Uses React Player for video playback
- Supports multiple video formats
- Implements video progress tracking

### User Authentication
- Session-based authentication with MongoDB store
- Secure password handling
- Protected routes and middleware

### Subscription Management
- Multiple subscription tiers
- Payment processing integration
- Subscription status tracking

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive navigation and layouts
- Optimized for all screen sizes

## 🤝 Contributing

This is a group assignment project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Alflix** - Your ultimate streaming experience! 🎬✨