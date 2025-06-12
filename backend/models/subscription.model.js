import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    SubName: {
        type: String,
        required: true,
        trim: true,
    },
    SubDescription: {
        type: String,
        required: true,
        trim: true,
    },
    SubPoints: [{
        type: String,
        trim: true,
    }],
    SubPrice: {
        type: Number,
        required: true,
    },
    SubDiscountedPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);


export default Subscription;
