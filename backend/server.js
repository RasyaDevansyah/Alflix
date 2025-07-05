import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import MongoStore from 'connect-mongo';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    }
}));

// API Routes
app.use('/api', apiRoutes);

// Static files and SPA routing
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*all", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
});
