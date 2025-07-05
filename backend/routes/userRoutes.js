import express from 'express';
import { 
    getCurrentUser, 
    logout, 
    register, 
    login, 
    getUserDetails, 
    updateFavorites, 
    updateActivity, 
    updateSubscription 
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validation.js';

const router = express.Router();

// Authentication routes
router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);

// User details and management routes
router.get('/:userId/details', validateObjectId('userId'), getUserDetails);
router.put('/:userId/favorites', validateObjectId('userId'), updateFavorites);
router.put('/:userId/activity', validateObjectId('userId'), updateActivity);
router.put('/:userId/subscription', validateObjectId('userId'), updateSubscription);

export default router; 