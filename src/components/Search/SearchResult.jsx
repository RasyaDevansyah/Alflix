    import React from 'react';
    import { Link } from 'react-router-dom';

    const SearchResult = ({ result }) => {
        return (
        <div className='fixed top-30 left-[80%] z-20 w-1/6 bg-gray-800/30 flex flex-col shadow-lg rounded-lg mt-4 max-h-[300px] overflow-y-auto scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-slate-600'>
          {result.length === 0 ? (
            <p className="text-center text-gray-400 py-4">No results found.</p>
          ) : (
            result.map((movie, idx) => (
              <Link key={idx} to="/VideoInfoPage" className='flex flex-row items-center w-full h-14 bg-gray-800 rounded-lg mt-2 shadow-lg px-4\'>
                <span className='flex w-full items-center text-white font-bold hover:text-purple-400 hover:underline hover:bg-gray-700 rounded-lg'>
                  <img src={movie.imgSource} alt={movie.title} className='w-10 h-10 rounded-lg mr-2' />
                  {movie.title}</span>
              </Link>
            ))
          )}
        </div>
);    
      };
      
      export default SearchResult;