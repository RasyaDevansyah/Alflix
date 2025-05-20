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
                    key={movie.id}
                    movieTitle={movie.title}
                    imgSource={movie.imgSource}
                    number={idx+1} 
                    />
                ))}
        </div>
    );
};

export default BrowseResult;