import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;

/*
Example movie data in JSON:

[
    {
        "name": "Inception",
        "releaseYear": 2010,
        "rating": 8.8,
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        "tags": ["sci-fi", "thriller", "action"],
        "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        "video": "https://example.com/inception.mp4"
    },
    {
        "name": "The Shawshank Redemption",
        "releaseYear": 1994,
        "rating": 9.3,
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "tags": ["drama", "crime"],
        "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        "video": "https://example.com/shawshank.mp4"
    },
    {
        "name": "The Matrix",
        "releaseYear": 1999,
        "rating": 8.7,
        "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        "tags": ["sci-fi", "action"],
        "actors": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        "video": "https://example.com/matrix.mp4"
    }
]
*/
