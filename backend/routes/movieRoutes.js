import express from 'express';
import { 
    getTrendingMovies, 
    getAllTags, 
    getMoviesWithRecommendations, 
    getAllMovies, 
    getMovieById 
} from '../controllers/movieController.js';
import { validateObjectId } from '../middleware/validation.js';

const router = express.Router();

// Movie discovery and trending
router.get('/trending', getTrendingMovies);
router.get('/tags', getAllTags);

// Movie search and recommendations
router.post('/', getMoviesWithRecommendations);
router.get('/', getAllMovies);

// Individual movie details
router.get('/:id', validateObjectId('id'), getMovieById);

export default router; 