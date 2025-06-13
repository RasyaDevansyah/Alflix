import avengers from '/src/assets/MoviePosters/Avengers.png';
import venom from '/src/assets/MoviePosters/Venom.png';
import thorRagnarook from '/src/assets/MoviePosters/ThorRagnarok.png';
import blackPanter from '/src/assets/MoviePosters/BlackPanter.png';

import jujutsuKaisen0 from '/src/assets/MoviePosters/JUJUTSU KAISEN 0.png';
import onePiece from '/src/assets/MoviePosters/One Piece Red.png';
import luca from '/src/assets/MoviePosters/Luca.png';
import cinderella from '/src/assets/MoviePosters/Cinderella.png';

import hunterXHunter from '/src/assets/MoviePosters/Hunter X Hunter.png';
import mobPyscho from '/src/assets/MoviePosters/Mob Pyscho 100.png';
import blueLock from '/src/assets/MoviePosters/Blue Lock.png';
import fairyTail from '/src/assets/MoviePosters/Fairy Tail.png';


import Navbar from '../components/HomePage/Navbar';
import Banner from '../components/HomePage/Banner';
import TrendingSection from '../components/HomePage/TrendingSection';
import MovieRow from '../components/HomePage/MovieRow';
import Footer from '../components/Footer';
import SearchBar from '../components/Search/SearchBar.jsx';
import SearchResult from '../components/Search/SearchResult.jsx';

import { useState, useEffect } from 'react';

function HomePage() {
    const [result, setResult] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [moviesData, setMoviesData] = useState({
        watchHistory: [],
        latestReleases: [],
        animeSeries: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                var data = await response.json();
                data = data.data; 

                // Assuming the API returns all movies and we need to categorize them
                // You might need to adjust this based on your actual API response structure
                setMoviesData({
                    watchHistory: data.slice(0, 7), // First 7 for watch history
                    latestReleases: data.slice(7, 15), // Next 8 for latest releases
                    animeSeries: data.slice(15, 23) // Next 8 for anime series
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    // if (loading) {
    //     return <div className="min-h-screen bg-[#1e1e2a] text-white flex justify-center items-center">Loading...</div>;
    // }

    if (error) {
        return <div className="min-h-screen bg-[#1e1e2a] text-white flex justify-center items-center">Error: {error}</div>;
    }

    const formatMovieData = (movie) => ({
        title: movie.title,
        imgSource: movie.poster,
        // Add any other required fields from the API response
        year: movie.year,
        rating: movie.rating,
        id: movie._id
    });

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <SearchBar searchResult={setResult} setIsSearchActive={setIsSearchActive}/>
                {result && <SearchResult result={result} />}
            </div>
            <Banner />
            <TrendingSection />
            <div className="flex-col justify-center mx-20">
                <MovieRow
                    title="Based on Your Watch History"
                    movies={moviesData.watchHistory.map(formatMovieData)}
                    viewAllLink="/history"
                />
                <MovieRow
                    title="Latest Releases"
                    movies={moviesData.latestReleases.map(formatMovieData)}
                    viewAllLink="/category/Latest Releases"
                />
                <MovieRow
                    title="Anime Series"
                    movies={moviesData.animeSeries.map(formatMovieData)}
                    viewAllLink="/category/Anime"
                />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;