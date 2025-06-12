import mongoose from "mongoose";

const movieListSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
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
    }]
}, {
    timestamps: true
});

const MovieList = mongoose.model("MovieList", movieListSchema);

export default MovieList;