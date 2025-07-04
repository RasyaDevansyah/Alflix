import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({
    moviesData,
    searchResult,
    setIsSearchActive,
    isBrowsePage = false,
    isCategoryPage = false
}) => {
    const [input, setInput] = useState("");

    const handleChange = (value) => {
        setInput(value);

        if (value.trim() === "") {
            setIsSearchActive?.(false);
            searchResult(null);
            return;
        }

        const filteredMovies = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(value.toLowerCase().trim())
        );

        searchResult(filteredMovies);
    };

    const sharedClasses =
        'z-20 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/6 rounded-2xl h-14 p-3 shadow-lg flex items-center ' +
        'bg-gray-800/30 backdrop-blur-sm group focus-within:bg-gray-800 dark:focus-within:bg-gray-900 ' +
        'transition-colors duration-1000';

    const positionClass = (isBrowsePage || isCategoryPage)
        ? 'relative mx-auto mb-4'
        : 'fixed top-20 left-1/2 transform -translate-x-1/2 lg:left-[80%] lg:translate-x-0';

    return (
        <div className={`${sharedClasses} ${positionClass}`}>
            <FaSearch className='text-[#6358D3] cursor-pointer' />
            <input
                type="text"
                placeholder='Type to search ...'
                className='bg-transparent border-none outline-none text-base ml-2 w-full text-gray-400 placeholder:text-gray-400 focus:placeholder:text-white focus:text-white transition-colors duration-1000'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsSearchActive?.(true)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.target.blur();
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;
