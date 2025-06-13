import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Movie from './models/movie.model.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/tags', async (req, res) => {
    try {
        // Get all unique tag IDs and names
        const tags = await Movie.aggregate([
            { $unwind: "$tags" },
            { 
                $group: {
                    _id: "$tags.id",
                    name: { $first: "$tags.name" },
                    count: { $sum: 1 } // counts how many movies have this tag
                }
            },
            { $sort: { count: -1 } } // sort by most used tags first
        ]);
        
        res.status(200).json({ 
            success: true, 
            data: tags 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            message: 'Error fetching tags', 
            error 
        });
    }
});

app.get('/api/movies', async (req, res) => {
    try {
        // Extract query parameters
        const { tag, tagId } = req.query;
        
        // Build filter object
        const filter = {};
        
        // Filter by tag name (case insensitive)
        if (tag) {
            filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        }
        
        // Filter by tag ID
        if (tagId) {
            filter['tags.id'] = parseInt(tagId);
        }
        
        const movies = await Movie.find(filter);
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movies', error });
    }
});


app.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movie', error });
    }
});


app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 http://localhost:5000');
});
