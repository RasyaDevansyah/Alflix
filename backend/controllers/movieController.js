import Movie from '../models/movie.model.js';
import mongoose from 'mongoose';
import { shuffleArray, deduplicateMovies } from '../utils/helpers.js';

export const getTrendingMovies = async (req, res) => {
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
};

export const getAllTags = async (req, res) => {
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
};

export const getMoviesWithRecommendations = async (req, res) => {
    try {
        const { tag, tagId } = req.query;
        const tagWeights = req.body; // { tagId: watchCount }

        const filter = {};
        if (tag) filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        if (tagId) {
            const tagIds = tagId.split(',').map(Number);
            filter['tags.id'] = { $in: tagIds };
        }
        if (!tagWeights || Object.keys(tagWeights).length === 0) {
            const movies = await Movie.find(filter);
            return res.status(200).json({ success: true, data: movies });
        }

        // Get all candidate movies
        const movies = await Movie.find(filter);
        
        // Calculate scores for each movie
        const scoredMovies = movies.map(movie => {
            let score = 0;
            movie.tags.forEach(tag => {
                score += tagWeights[String(tag.id)] || 0;
            });
            return { movie, score };
        });

        // Filter out movies with zero score
        const filteredScored = scoredMovies.filter(item => item.score > 0);
        
        if (filteredScored.length === 0) {
            return res.status(200).json({ success: true, data: movies });
        }

        // Create weighted pool
        let recommendationPool = [];
        filteredScored.forEach(({ movie, score }) => {
            // Use logarithmic scaling to prevent domination by huge weights
            const count = Math.ceil(Math.log(score + 1) * 3); // +1 to avoid log(0)
            recommendationPool.push(...Array(count).fill(movie));
        });

        // Shuffle and deduplicate
        recommendationPool = shuffleArray(recommendationPool);
        const uniqueMovies = deduplicateMovies(recommendationPool);

        // Sort by original score for fallback ordering
        uniqueMovies.sort((a, b) => {
            const aScore = scoredMovies.find(m => m.movie._id.equals(a._id)).score;
            const bScore = scoredMovies.find(m => m.movie._id.equals(b._id)).score;
            return bScore - aScore;
        });

        res.status(200).json({
            success: true,
            data: uniqueMovies,
            isRecommendation: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

export const getAllMovies = async (req, res) => {
    try {
        const { tag, tagId } = req.query;

        const filter = {};
        if (tag) filter['tags.name'] = { $regex: new RegExp(tag, 'i') };
        if (tagId) {
            const tagIds = tagId.split(',').map(Number);
            filter['tags.id'] = { $in: tagIds };
        }

        const movies = await Movie.find(filter);
        return res.status(200).json({ success: true, data: movies });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

export const getMovieById = async (req, res) => {
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
}; 