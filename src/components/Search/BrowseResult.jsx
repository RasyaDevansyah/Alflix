import React from 'react';
import MovieCard from '../HomePage/MovieCard';

const BrowseResult = ({ movies }) => {
    // const noMoviesStyle = {
    //     color: '#ccc',
    //     fontSize: '18px',
    //     textAlign: 'center',
    //     width: '100%',
    // };

    return (
        <div className="flex flex-wrap gap-[20px] mt-[16px]">
                {movies.map((movie, idx) => (
                    <MovieCard 
                    key={movie._id}
                    movieTitle={movie.title}
                    imgSource={movie.poster}
                    number={idx+1} 
                    id ={movie._id}
                    />
                ))}
        </div>
    );
};

export default BrowseResult;