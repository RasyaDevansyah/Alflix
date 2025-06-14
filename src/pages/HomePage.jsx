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
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllMovies(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchPopularGenresAndMovies = async () => {
            try {
                const tagsResponse = await fetch('/api/tags');
                if (!tagsResponse.ok) {
                    throw new Error('Failed to fetch tags');
                }
                const tagsData = await tagsResponse.json();
                const popularGenres = tagsData.data
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 8);

                const genreMoviesData = {};
                for (const genre of popularGenres) {
                    const moviesResponse = await fetch(`/api/movies?tagId=${genre._id}`);
                    if (!moviesResponse.ok) {
                        continue;
                    }
                    const moviesData = await moviesResponse.json();
                    genreMoviesData[genre.name] = moviesData.data.slice(0, 10);
                }

                setGenreMovies(genreMoviesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
        fetchPopularGenresAndMovies();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-[#1e1e2a] text-white flex justify-center items-center">
                Error: {error}
            </div>
        );
    }

    const formatMovieData = (movie) => ({
        title: movie.title,
        imgSource: movie.poster,
        year: movie.year,
        rating: movie.rating,
        id: movie._id
    });

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
            <Navbar />
            <Banner />
            <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col items-center md:items-end">
                <SearchBar
                    moviesData={allMovies}
                    searchResult={setResult}
                    setIsSearchActive={setIsSearchActive}
                />
                {result && <SearchResult result={result} />}
            </div>
           
            <TrendingSection />

            <div className="flex flex-col justify-center px-4 md:px-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading...</p>
                    </div>
                ) : (
                    Object.entries(genreMovies).map(([genreName, movies]) => (
                        <MovieRow
                            key={genreName}
                            title={genreName}
                            movies={movies.map(formatMovieData)}
                            viewAllLink={`/category/${genreName}`}
                        />
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;
