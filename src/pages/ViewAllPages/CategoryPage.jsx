import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/HomePage/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/HomePage/MovieCard";
import SearchBar from '../../components/Search/SearchBar.jsx';

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

const dummyMovies = [
    { title: "Avengers", imgSource: avengers, id: 1, category: ["Action", "Latest Releases"] },
    { title: "Venom", imgSource: venom, id: 2, category: ["Action", "Latest Releases"] },
    { title: "Thor: Ragnarok", imgSource: thorRagnarook, id: 3, category: ["Action", "Latest Releases"] },
    { title: "JUJUTSU KAISEN 0", imgSource: jujutsuKaisen0, id: 4, category: ["Anime", "Latest Releases"] },
    { title: "ONE PIECE: RED", imgSource: onePiece, id: 5, category: "Anime" },
    { title: "LUCA", imgSource: luca, id: 6, category: ["Anime", "Latest Releases"] },
    { title: "CINDERELLA", imgSource: cinderella, id: 7, category: ["Latest Releases"] },
    { title: "HUNTER X HUNTER", imgSource: hunterXHunter, id: 8, category: ["Anime"] },
    { title: "MOB PSYCHO 100", imgSource: mobPyscho, id: 9, category: ["Anime", "Latest Releases"] },
    { title: "BLUE LOCK", imgSource: blueLock, id: 10, category: ["Anime"] },
    { title: "FAIRY TAIL", imgSource: fairyTail, id: 11, category: ["Anime"] },
];

function CategoryPage() {
    const [searchResult, setSearchResult] = useState(null);
    const { category } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const filteredMovies = dummyMovies.filter(movie =>
            Array.isArray(movie.category)
                ? movie.category.map(c => c.toLowerCase()).includes(category.toLowerCase())
                : movie.category.toLowerCase() === category.toLowerCase()
        );
        setMovies(filteredMovies);
        setSearchResult(null);
    }, [category]);

    const handleSearch = (filteredMovies) => {
        if (!filteredMovies || filteredMovies.length === 0) {
            setSearchResult(null);
        } else {
            setSearchResult(filteredMovies);
        }
    };

    const displayMovies = searchResult !== null ? searchResult : movies;

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <div className="mx-20 my-8">
                <h1 className="text-3xl font-bold mt-10 mb-5 capitalize">{category}</h1>
                <SearchBar
                    searchResult={handleSearch}
                    setIsSearchActive={() => { }}
                    movies={movies}
                />
                <div className="flex flex-wrap gap-[20px] mt-[16px]">
                    {displayMovies.map((movie, idx) => (
                        <MovieCard
                            key={movie.id}
                            movieTitle={movie.title}
                            imgSource={movie.imgSource}
                            number={idx + 1}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default CategoryPage;