import React from 'react';
import MovieCard from '../HomePage/MovieCard';

const BrowseResult = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="text-center text-gray-400 text-lg mt-10">
                No movies found.
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid gap-6 sm:gap-8 mt-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            justify-center lg:justify-start">
                {movies.map((movie, idx) => (
                    <MovieCard
                        key={movie._id}
                        movieTitle={movie.title}
                        imgSource={movie.poster}
                        id={movie._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrowseResult;
