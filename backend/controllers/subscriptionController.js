import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res) => {
    const subscription = req.body;

    if (!subscription.title || !subscription.description || !subscription.normalPrice || !subscription.discountedPrice || !subscription.benefits) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newSubscription = new Subscription(subscription);

    try {
        await newSubscription.save();
        res.status(201).json({ success: true, data: newSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error saving subscription', error });
    }
};

export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching subscriptions', error: error.message });
    }
}; 