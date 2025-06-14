import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    benefits: [{
        type: String,
        trim: true,
    }],
    normalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: false
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);


export default Subscription;

