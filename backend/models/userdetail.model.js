import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    watched: {
        type: Number,
        default: 0,
    },
    subId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
    },
    watchHours: [
        {
            date: {
                type: Date,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
        }
    ],
    history: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
                required: true,
            },
            movieTags: [
                {
                    tagId: {
                        type: Number,
                        required: true,
                    },
                    tagName: {
                        type: String,
                        required: true,
                    }
                }
            ],
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    favorites: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
                required: true,
            },
            movieTags: [
                {
                    tagId: {
                        type: Number,
                        required: true,
                    },
                    tagName: {
                        type: String,
                        required: true,
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

const UserDetail = mongoose.model("UserDetail", userDetailSchema);

export default UserDetail;
