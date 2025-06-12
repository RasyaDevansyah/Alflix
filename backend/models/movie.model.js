import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String, // Can store base64 string, but not recommended for large images
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0.0,
        max: 10.0,
    },
    video: {
        type: String, // Store video file path or URL
        required: true,
    },
    imgHeader: {
        type: String, // Can store base64 string, but not recommended for large images
        required: true,
    },
    imgSubheader: {
        type: String, // Can store base64 string, but not recommended for large images
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    quote: {
        type: String,
        required: false,
    },
    tags: [{
        id: {
        type: Number,
        required: true,
        },
        name: {
            type: String,
            required: true,
        }
    }],
    cast: [{
        castPicture: {
            type: String, // Can store base64 string, but not recommended for large images
            required: true,
        },
        actorName: {
            type: String,
            required: true,
        },
        roleName: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

