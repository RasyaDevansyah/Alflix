import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Movie from './models/movie.model.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/movies', async (req, res) => {
    const movie = req.body;

    // if(!movie.name || !movie.releaseYear || !movie.rating || !movie.description || !movie.tags || !movie.actors || !movie.video) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    const newMovie = new Movie(movie);

    try {
        await newMovie.save();
        res.status(201).json({ success: true, data: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error saving movie', error });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ success: true, data: deletedMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
});

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movies', error });
    }
});

// postman desktop app

app.put('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = req.body;

    if(!mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(400).json({success: false,  message: 'Invalid movie ID' });
    }

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, movie, { new: true });
        console.log(movie);
        console.log(updatedMovie);
        res.status(200).json({ success: true, data: updatedMovie });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error updating movie', error });
    }
}
);

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 http://localhost:5000');
});
