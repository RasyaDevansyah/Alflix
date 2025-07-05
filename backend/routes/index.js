import express from 'express';
import subscriptionRoutes from './subscriptionRoutes.js';
import userRoutes from './userRoutes.js';
import movieRoutes from './movieRoutes.js';
import { getAllTags } from '../controllers/movieController.js';

const router = express.Router();

// Mount route modules
router.use('/subscription', subscriptionRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

// Standalone tags endpoint for backward compatibility
router.get('/tags', getAllTags);

export default router; 