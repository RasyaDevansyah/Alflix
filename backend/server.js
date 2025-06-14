import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Movie from './models/movie.model.js';
import Subscription from './models/subscription.model.js';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import UserDetail from './models/userdetail.model.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/subscription', async (req, res) => {
    const subscription = req.body;

    if (!subscription.title || !subscription.description || !subscription.normalPrice || !subscription.discountedPrice || !subscription.benefits) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newSubscription = new Subscription(subscription);

    try {
        await newSubscription.save();
        res.status(201).json({ success: true, data: newSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error saving movie', error });
    }
});

app.post('/api/users/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Basic validation
    if (!username || !password || !email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username, password, and email are required' 
        });
    }
    // Username validation: 3-20 characters, alphanumeric and underscores allowed
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            success: false,
            message: 'Username must be 3-20 characters long and contain only letters, numbers, or underscores'
        });
    }

    // Password validation: 8-30 characters, must include at least one number
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,30}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be 8-30 characters long and contain at least one number'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
        }
        // Email must be all lowercase
        if (email !== email.toLowerCase()) {
        return res.status(400).json({
            success: false,
            message: 'Email must be all lowercase'
        });
    }

    try {
        // Check if email already exists in either User or UserDetail
        const existingUser = await User.findOne({ email });
        const existingUserDetail = await UserDetail.findOne({ email });
        
        if (existingUser || existingUserDetail) {
            return res.status(409).json({ 
                success: false, 
                message: 'Email already exists' 
            });
        }
        
        // Create new User
        const newUser = new User({
            username,
            password, // Note: In production, you should hash the password before saving
            email
        });

        // Create corresponding UserDetail
        const newUserDetail = new UserDetail({
            username,
            password, // Note: This should match the hashed password in User if stored
            email,
            watched: 0,
            watchHours: [],
            history: []
        });

        // Save both documents in a transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await newUser.save({ session });
            await newUserDetail.save({ session });
            await session.commitTransaction();
            
            res.status(201).json({ 
                success: true, 
                data: {
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email
                    }
                }
            });
        } catch (error) {
            await session.abortTransaction();
            throw error; // This will be caught by the outer catch block
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Error registering user', 
            error: error.message 
        });
    }
});

app.put('/api/users/:userId/subscription', async (req, res) => {
    const { userId } = req.params;
    const { subId } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(subId)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid user ID or subscription ID' 
        });
    }

    try {
        // Check if user exists
        const userDetail = await UserDetail.findById(userId);
        if (!userDetail) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Check if subscription exists
        const subscription = await Subscription.findById(subId);
        if (!subscription) {
            return res.status(404).json({ 
                success: false, 
                message: 'Subscription not found' 
            });
        }

        // Update the subscription
        userDetail.subId = subId;
        await userDetail.save();

        res.status(200).json({ 
            success: true, 
            data: {
                userId: userDetail._id,
                subId: userDetail.subId,
                subscriptionTitle: subscription.title
            }
        });
    } catch (error) {
        console.error('Subscription update error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating subscription', 
            error: error.message 
        });
    }
});

app.get('/api/movies/trending', async (req, res) => {
    try {
        // Get current year
        const currentYear = new Date().getFullYear();
        // Get best rated movies from recent years (last 3 years)
        const bestRatedRecent = await Movie.aggregate([
            {
                $match: {
                    year: { $gte: currentYear - 3 } // Only movies from last 3 years
                }
            },
            {
                $sort: { rating: -1, year: -1 }
            },
            {
                $limit: 10
            }
        ]);
        // Get newest movies (current year)
        const newestMovies = await Movie.aggregate([
            {
                $match: {
                    year: currentYear
                }
            },
            {
                $sort: { rating: -1 }
            },
            {
                $limit: 10
            }
        ]);
        // Combine and deduplicate
        const combined = [...bestRatedRecent, ...newestMovies];
        const uniqueMovies = combined.reduce((acc, movie) => {
            if (!acc.some(m => m._id.equals(movie._id))) {
                acc.push(movie);
            }
            return acc;
        }, []);
        
        res.status(200).json({ 
            success: true, 
            data: uniqueMovies 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            message: 'Error fetching trending movies', 
            error 
        });
    }
});


app.get('/api/tags', async (req, res) => {
    try {
        // Get all unique tag IDs and names
        const tags = await Movie.aggregate([
            { $unwind: "$tags" },
            { 
                $group: {
                    _id: "$tags.id",
                    name: { $first: "$tags.name" },
                    count: { $sum: 1 } // counts how many movies have this tag
                }
            },
            { $sort: { count: -1 } } // sort by most used tags first
        ]);
        
        res.status(200).json({ 
            success: true, 
            data: tags 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            message: 'Error fetching tags', 
            error 
        });
    }
});

app.get('/api/movies', async (req, res) => {
    try {
        const { tag, tagId } = req.query;
        const filter = {};
        if (tag) {
            filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        }
        if (tagId) {
            filter['tags.id'] = parseInt(tagId);
        }
        
        const movies = await Movie.find(filter);
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movies', error });
    }
});


app.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movie', error });
    }
});


app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 http://localhost:5000');
});
