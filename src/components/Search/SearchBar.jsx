    import React, { useState } from 'react';
    import { FaSearch } from 'react-icons/fa';
    import avengers from '/src/assets/MoviePosters/Avengers.png';
    import venom from '/src/assets/MoviePosters/Venom.png';
    import thorRagnarook from '/src/assets/MoviePosters/ThorRagnarok.png';
    import jujutsuKaisen0 from '/src/assets/MoviePosters/JUJUTSU KAISEN 0.png';
    import onePiece from '/src/assets/MoviePosters/One Piece Red.png';
    import luca from '/src/assets/MoviePosters/Luca.png';
    import cinderella from '/src/assets/MoviePosters/Cinderella.png';
    import hunterXHunter from '/src/assets/MoviePosters/Hunter X Hunter.png';
    import mobPyscho from '/src/assets/MoviePosters/Mob Pyscho 100.png';
    import blueLock from '/src/assets/MoviePosters/Blue Lock.png';
    import fairyTail from '/src/assets/MoviePosters/Fairy Tail.png';
    

    const SearchBar = ({searchResult, setIsSearchActive}) => {
        const [input, setInput] = useState("")

        const handleChange = (value) => {
            setInput(value)
            const movies = [ // dummy movie
                {title: "Avengers", imgSource: avengers, id: 1, category: ["Action", "Latest Releases"]},
                {title: "Venom", imgSource: venom, id: 2, category: ["Action", "Latest Releases"]},
                {title: "Thor: Ragnarok", imgSource: thorRagnarook, id: 3, category: ["Action", "Latest Releases"]},
                {title: "JUJUTSU KAISEN 0", imgSource: jujutsuKaisen0, id: 4, category: ["Anime", "Latest Releases"]},
                {title: "ONE PIECE: RED", imgSource: onePiece, id: 5, category: "Anime"},
                {title: "LUCA", imgSource: luca, id: 6, category: ["Anime", "Latest Releases"]},
                {title: "CINDERELLA", imgSource: cinderella, id: 7, category: ["Latest Releases"]},
                {title: "HUNTER X HUNTER", imgSource: hunterXHunter, id: 8, category: ["Anime"]},
                {title: "MOB PSYCHO 100", imgSource: mobPyscho, id: 9, category: ["Anime", "Latest Releases"]},
                {title: "BLUE LOCK", imgSource: blueLock, id: 10, category: ["Anime"]},
                {title: "FAIRY TAIL", imgSource: fairyTail, id: 11, category: ["Anime"]},
            ];

            if(value.trim() === "") {
                setIsSearchActive(false);
                searchResult(null); 
                return;
            }
            const filteredMovies = movies.filter(movie =>
                movie.title.toLowerCase().includes(value.toLowerCase().trim())
            );

            console.log(filteredMovies);
            searchResult(filteredMovies);
        };

        // const handleBlur = () => {
        //     setTimeout(() => {
        //         setIsSearchActive(false);
        //         if (input.trim() !== "") {
        //             setInput("");
        //             searchResult([]); 
        //         }
        //     }, 200);
        // };

        return (
            <div className='fixed top-18 left-[80%] z-20 w-1/6 rounded-2xl h-14 p-3 shadow-lg flex items-center bg-gray-800/30 backdrop-blur-sm group focus-within:bg-gray-800 dark:focus-within:bg-gray-900 transition-colors duration-1000'>
                <FaSearch className='text-[#6358D3] cursor-pointer'/>
                <input 
                type="text" 
                placeholder='Type to search ...' 
                className='bg-transparent border-none outline-none text-base ml-2 w-full text-gray-400 placeholder:text-gray-400 focus:placeholder:text-white focus:text-white transition-colors duration-1000'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
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

