    import React, { useState } from 'react';
    import { FaSearch } from 'react-icons/fa';

    const SearchBar = ({searchResult}) => {
        const [input, setInput] = useState("")

        const handleChange = (value) => {
            setInput(value)
            console.log(value)
        };


        return (
            <div className='fixed top-18 left-[80%] z-20 w-1/6 rounded-2xl h-14 p-3 shadow-lg flex items-center bg-gray-800/30 backdrop-blur-sm group focus-within:bg-gray-800 dark:focus-within:bg-gray-900 transition-colors duration-1000'>
                <FaSearch className='text-[#6358D3] cursor-pointer'/>
                <input 
                type="text" 
                placeholder='Type to search ...' 
                className='bg-transparent border-none outline-none text-base ml-2 w-full text-gray-400 placeholder:text-gray-400 focus:placeholder:text-white focus:text-white transition-colors duration-1000'
                onChange={(e) => handleChange(e.target.value)}/>
            </div>
        );
    };

    export default SearchBar;

