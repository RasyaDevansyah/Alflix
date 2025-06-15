import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Movie from './models/movie.model.js';
import Subscription from './models/subscription.model.js';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import UserDetail from './models/userdetail.model.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // if true: only transmit cookie over https
      httpOnly: true, // prevents client-side JS from reading the cookie
    }
}));


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


app.get('/api/users/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    res.status(200).json({ success: true, data: { user: req.session.user } });
});

app.post('/api/users/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});


app.post('/api/users/register', async (req, res) => {
    const { username, password, confirmPassword, email } = req.body;

    // Basic validation
    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            message: 'Username, password, and email are required'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Passwords do not match'
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

            // Return user data without sensitive information
            res.status(200).json({
                success: true,
                data: {
                    user:{
                        _id: newUser._id,
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

app.post('/api/users/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email !== email.toLowerCase()) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // In production, you would compare hashed passwords here
        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }


        if (rememberMe) {
            req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // 1 day
        } else {
            req.session.cookie.maxAge  =  60 * 1000; // 1 minute
        }
        
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Return user data without sensitive information
        res.status(200).json({
            success: true,
            data: {
                user: req.session.user
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
});


app.get('/api/users/:userId/details', async (req, res) => {
    const { userId } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID format'
        });
    }

    try {
        // Find user in User collection
        const user = await User.findById(userId).select('email').lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in User collection'
            });
        }

        // Find corresponding UserDetail using email
        const userDetail = await UserDetail.findOne({ email: user.email })
            .populate('subId', 'title description') // Optional: populate subscription details
            .populate('history.movieId', 'imgHeader title') // Optional: populate movie details
            .populate('favorites.movieId', 'imgHeader title') // Optional: populate movie details
            .lean();

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found in UserDetail collection'
            });
        }

        // Remove sensitive data before sending
        const { password, ...safeDetails } = userDetail;

        res.status(200).json({
            success: true,
            data: safeDetails
        });

    } catch (error) {
        console.error('Error in /api/users/:userId/details:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching user details',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.put('/api/users/:userId/favorites', async (req, res) => {
    const { userId } = req.params;
    const { movieId, action } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid movie ID'
        });
    }

    if (!['add', 'remove'].includes(action)) {
        return res.status(400).json({
            success: false,
            message: 'Action must be either "add" or "remove"'
        });
    }

    try {
        // Find user in User collection
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find corresponding UserDetail using email
        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found'
            });
        }

        // Check if movie exists and get its details
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        let message = '';

        if (action === 'add') {
            // Check if already in favorites
            const alreadyFavorite = userDetail.favorites.find(fav => 
                fav.movieId.equals(movieId)
            );

            if (alreadyFavorite) {
                message = 'Movie already in favorites';
                updatedFavorites = userDetail.favorites;
            } else {
                const favoriteItem = {
                    movieId: movieId,
                    movieTags: movie.tags ? movie.tags.map(tag => ({
                        tagId: tag.id,
                        tagName: tag.name
                    })) : []
                };
                userDetail.favorites.push(favoriteItem);
                message = 'Movie added to favorites';
            }
        } else if (action === 'remove') {
            // Remove from favorites
            const initialCount = userDetail.favorites.length;
            userDetail.favorites = userDetail.favorites.filter(
                fav => !fav.movieId.equals(movieId)
            );
            const removedCount = initialCount - userDetail.favorites.length;
            message = removedCount > 0 
                ? 'Movie removed from favorites' 
                : 'Movie was not in favorites';
        }

        // Save the updated user details
        await userDetail.save();

        // Populate favorites with movie details before sending response
        const populatedFavorites = await UserDetail.populate(userDetail, {
            path: 'favorites.movieId',
            select: 'title poster'
        });

        res.status(200).json({
            success: true,
            message: message,
            data: {
                favorites: populatedFavorites.favorites.map(fav => ({
                    movieId: fav.movieId._id,
                    title: fav.movieId.title,
                    poster: fav.movieId.poster,
                    tags: fav.movieTags
                }))
            }
        });

    } catch (error) {
        console.error('Favorites update error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error updating favorites',
            error: error.message
        });
    }
});

app.put('/api/users/:userId/activity', async (req, res) => {
    const { userId } = req.params;
    const { movieId, duration, tags } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid movie ID'
        });
    }

    if (duration && typeof duration !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Duration must be a number'
        });
    }

    try {
        // Check if user exists in User model
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find corresponding UserDetail using the email (since both models have email)
        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found'
            });
        }

        // Check if movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }



        // Add watch hours if duration is provided
        if (duration) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to start of day for grouping
            
            // Find existing watch hour entry for today
            const existingEntry = userDetail.watchHours.find(entry => 
                entry.date.getTime() === today.getTime()
            );
            
            if (existingEntry) {
                existingEntry.duration += duration;
            } else {
                userDetail.watchHours.push({
                    date: today,
                    duration: duration
                });
            }
        }

        // Add to history if not already there (prevent duplicates)
        const existingHistoryItem = userDetail.history.find(item => 
            item.movieId.equals(movieId)
        );

        if (!existingHistoryItem) {
            const historyItem = {
                movieId: movieId,
                movieTags: movie.tags ? movie.tags.map(tag => ({
                    tagId: tag.id,
                    tagName: tag.name
                })) : [],
                timestamp: new Date()
            };
            userDetail.history.push(historyItem);
        } else {
            // Update timestamp if already exists
            existingHistoryItem.timestamp = new Date();
        }

        
        userDetail.watched = userDetail.history.length;
        
        // Save the updated user details
        await userDetail.save();

        res.status(200).json({
            success: true,
            data: {
                watched: userDetail.watched,
                watchHours: userDetail.watchHours,
                history: userDetail.history
            }
        });

    } catch (error) {
        console.error('User activity update error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error updating user activity',
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
        const tagWeights = req.body; // { tagId: watchCount }

        const filter = {};
        if (tag) filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        if (tagId) {
            const tagIds = tagId.split(',').map(Number);
            filter['tags.id'] = { $in: tagIds };
        }

        // Regular filtered results if no weights
        if (!tagWeights || Object.keys(tagWeights).length === 0) {
            const movies = await Movie.find(filter);
            return res.status(200).json({ success: true, data: movies });
        }

        // Get all candidate movies
        const movies = await Movie.find(filter);
        
        // Calculate scores for each movie
        const scoredMovies = movies.map(movie => {
            let score = 0;
            movie.tags.forEach(tag => {
                score += tagWeights[tag.id] || 0;
            });
            return { movie, score };
        });

        // Filter out movies with zero score
        const filteredScored = scoredMovies.filter(item => item.score > 0);
        
        if (filteredScored.length === 0) {
            return res.status(200).json({ success: true, data: movies });
        }

        // Create weighted pool
        let recommendationPool = [];
        filteredScored.forEach(({ movie, score }) => {
            // Use logarithmic scaling to prevent domination by huge weights
            const count = Math.ceil(Math.log(score + 1) * 3); // +1 to avoid log(0)
            recommendationPool.push(...Array(count).fill(movie));
        });

        // Shuffle and deduplicate
        recommendationPool = shuffleArray(recommendationPool);
        const seenIds = new Set();
        const uniqueMovies = [];
        
        for (const movie of recommendationPool) {
            if (!seenIds.has(movie._id.toString())) {
                seenIds.add(movie._id.toString());
                uniqueMovies.push(movie);
            }
        }

        // Sort by original score for fallback ordering
        uniqueMovies.sort((a, b) => {
            const aScore = scoredMovies.find(m => m.movie._id.equals(a._id)).score;
            const bScore = scoredMovies.find(m => m.movie._id.equals(b._id)).score;
            return bScore - aScore;
        });

        res.status(200).json({
            success: true,
            data: uniqueMovies,
            isRecommendation: true
        });
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

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/dist")));


app.get("/*all", (req, res) => {
	res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
});
