// Helper function to shuffle an array
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Helper function to deduplicate movies by ID
export const deduplicateMovies = (movies) => {
    const seenIds = new Set();
    const uniqueMovies = [];
    
    for (const movie of movies) {
        if (!seenIds.has(movie._id.toString())) {
            seenIds.add(movie._id.toString());
            uniqueMovies.push(movie);
        }
    }
    
    return uniqueMovies;
};

// Helper function to create movie tags array
export const createMovieTags = (movie) => {
    return movie.tags ? movie.tags.map(tag => ({
        tagId: tag.id,
        tagName: tag.name
    })) : [];
}; 