import express from 'express';
import { createSubscription, getAllSubscriptions } from '../controllers/subscriptionController.js';

const router = express.Router();

// POST /api/subscription - Create a new subscription
router.post('/', createSubscription);

// GET /api/subscriptions - Get all subscriptions
router.get('/', getAllSubscriptions);

export default router; 