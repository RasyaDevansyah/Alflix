import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Movie from './models/movie.model.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/movies/trending', async (req, res) => {
    try {
        // Get current year
        const currentYear = new Date().getFullYear();
        
        // Get best rated movies from recent years (last 3 years)
        const bestRatedRecent = await Movie.aggregate([
            {
                $match: {
                    year: { $gte: currentYear - 3 } // Only movies from last 3 years
                }
            },
            {
                $sort: { rating: -1, year: -1 }
            },
            {
                $limit: 10
            }
        ]);
        
        // Get newest movies (current year)
        const newestMovies = await Movie.aggregate([
            {
                $match: {
                    year: currentYear
                }
            },
            {
                $sort: { rating: -1 }
            },
            {
                $limit: 10
            }
        ]);
        
        // Combine and deduplicate
        const combined = [...bestRatedRecent, ...newestMovies];
        const uniqueMovies = combined.reduce((acc, movie) => {
            if (!acc.some(m => m._id.equals(movie._id))) {
                acc.push(movie);
            }
            return acc;
        }, []);
        
        res.status(200).json({ 
            success: true, 
            data: uniqueMovies 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            message: 'Error fetching trending movies', 
            error 
        });
    }
});



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
        const { tag, tagId } = req.query;
        const filter = {};
        if (tag) {
            filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        }
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
