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
                console.log('All movies fetched:', data.data); // Log the data directly
            } catch (err) {
                setError(err.message);
                console.error('Error fetching all movies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllMovies();

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

                // Fetch movies for each popular genre
                const genreMoviesData = {};
                for (const genre of popularGenres) {
                    const moviesResponse = await fetch(`/api/movies?tagId=${genre._id}`);
                    if (!moviesResponse.ok) {
                        console.error(`Failed to fetch movies for genre ${genre.name}`);
                        continue;
                    }
                    const moviesData = await moviesResponse.json();
                    genreMoviesData[genre.name] = moviesData.data.slice(0, 10); // Take first 10 movies
                }

                setGenreMovies(genreMoviesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularGenresAndMovies();
    }, []);

    if (error) {
        return <div className="min-h-screen bg-[#1e1e2a] text-white flex justify-center items-center">Error: {error}</div>;
    }

    const formatMovieData = (movie) => ({
        title: movie.title,
        imgSource: movie.poster,
        year: movie.year,
        rating: movie.rating,
        id: movie._id
    });

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <SearchBar moviesData={allMovies} searchResult={setResult} setIsSearchActive={setIsSearchActive} />
                {result && <SearchResult result={result} />}
            </div>

            <Banner />
            <TrendingSection />
            <div className="flex-col justify-center mx-20">
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