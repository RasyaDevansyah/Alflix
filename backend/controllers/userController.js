import User from '../models/user.model.js';
import UserDetail from '../models/userdetail.model.js';
import Subscription from '../models/subscription.model.js';
import Movie from '../models/movie.model.js';
import mongoose from 'mongoose';
import { validateEmail, validateUsername, validatePassword } from '../middleware/validation.js';
import { createMovieTags } from '../utils/helpers.js';

export const getCurrentUser = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    res.status(200).json({ success: true, data: { user: req.session.user } });
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};

export const register = async (req, res) => {
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

    if (!validateUsername(username)) {
        return res.status(400).json({
            success: false,
            message: 'Username must be 3-20 characters long and contain only letters, numbers, or underscores'
        });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be 8-30 characters long and contain at least one number'
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
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
            password,
            email
        });

        // Create corresponding UserDetail
        const newUserDetail = new UserDetail({
            username,
            password,
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

            res.status(200).json({
                success: true,
                data: {
                    user: {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email
                    }
                }
            });

        } catch (error) {
            await session.abortTransaction();
            throw error;
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
};

export const login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    if (!validateEmail(email)) {
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
            req.session.cookie.maxAge = 60 * 1000; // 1 minute
        }
        
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

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
};

export const getUserDetails = async (req, res) => {
    const { userId } = req.params;

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
            .populate('subId', 'title description')
            .populate('history.movieId', 'imgHeader title')
            .populate('favorites.movieId', 'imgHeader title')
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
};

export const updateFavorites = async (req, res) => {
    const { userId } = req.params;
    const { movieId, action } = req.body;

    // If no body or no movieId/action, just return all favorites
    if (!movieId || !action) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found'
            });
        }

        const populatedFavorites = await UserDetail.populate(userDetail, {
            path: 'favorites.movieId',
            select: 'title poster'
        });

        return res.status(200).json({
            success: true,
            data: {
                favorites: populatedFavorites.favorites.map(fav => ({
                    movieId: fav.movieId._id,
                    title: fav.movieId.title,
                    poster: fav.movieId.poster,
                    tags: fav.movieTags
                }))
            }
        });
    }

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
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found'
            });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        let message = '';

        if (action === 'add') {
            const alreadyFavorite = userDetail.favorites.find(fav => 
                fav.movieId.equals(movieId)
            );

            if (alreadyFavorite) {
                message = 'Movie already in favorites';
            } else {
                const favoriteItem = {
                    movieId: movieId,
                    movieTags: createMovieTags(movie)
                };
                userDetail.favorites.push(favoriteItem);
                message = 'Movie added to favorites';
            }
        } else if (action === 'remove') {
            const initialCount = userDetail.favorites.length;
            userDetail.favorites = userDetail.favorites.filter(
                fav => !fav.movieId.equals(movieId)
            );
            const removedCount = initialCount - userDetail.favorites.length;
            message = removedCount > 0 
                ? 'Movie removed from favorites' 
                : 'Movie was not in favorites';
        }

        await userDetail.save();

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
};

export const updateActivity = async (req, res) => {
    const { userId } = req.params;
    const { movieId, duration } = req.body;

    console.log("activity duration = " + duration);

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
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User details not found'
            });
        }

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
            today.setHours(0, 0, 0, 0);
            
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

        // Add to history if not already there
        const existingHistoryItem = userDetail.history.find(item => 
            item.movieId.equals(movieId)
        );

        if (!existingHistoryItem) {
            const historyItem = {
                movieId: movieId,
                movieTags: createMovieTags(movie),
                timestamp: new Date()
            };
            userDetail.history.push(historyItem);
        } else {
            existingHistoryItem.timestamp = new Date();
        }

        userDetail.watched = userDetail.history.length;
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
};

export const updateSubscription = async (req, res) => {
    const { userId } = req.params;
    const { subId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(subId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID or subscription ID'
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userDetail = await UserDetail.findOne({ email: user.email });
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User detail not found'
            });
        }

        const subscription = await Subscription.findById(subId);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

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
}; 