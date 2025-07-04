import Navbar from '../components/HomePage/Navbar';
import SearchBar from '../components/Search/SearchBar.jsx';
import Footer from '../components/Footer';
import MovieRow from '../components/HomePage/MovieRow';
import BrowseResult from '../components/Search/BrowseResult.jsx';
import { useState, useEffect } from 'react';

function BrowsePage() {
    const [result, setResult] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/movies');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setAllMovies(data.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching all movies:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchPopularGenresAndMovies = async () => {
            try {
                const tagsResponse = await fetch('/api/tags');
                if (!tagsResponse.ok) throw new Error('Failed to fetch tags');
                const tagsData = await tagsResponse.json();

                const popularGenres = tagsData.data
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 4);

                const genreMoviesData = {};
                for (const genre of popularGenres) {
                    const moviesResponse = await fetch(`/api/movies?tagId=${genre._id}`);
                    if (!moviesResponse.ok) continue;
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

    const formatMovieData = (movie) => ({
        title: movie.title,
        imgSource: movie.poster,
        year: movie.year,
        rating: movie.rating,
        id: movie._id,
    });

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />

            {/* Kontainer Utama */}
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-8">
                {/* Responsive SearchBar */}
                <div className="block lg:hidden mb-4">
                    <SearchBar
                        moviesData={allMovies}
                        searchResult={setResult}
                        setIsSearchActive={setIsSearchActive}
                        isBrowsePage={true}
                    />
                </div>

                {/* Desktop SearchBar (Fixed Position) */}
                <div className="hidden lg:block">
                    <SearchBar
                        moviesData={allMovies}
                        searchResult={setResult}
                        setIsSearchActive={setIsSearchActive}
                    />
                </div>

                {/* Search Result */}
                {result ? (
                    result.length > 0 ? (
                        <div className="mt-8 flex justify-center lg:justify-start">
                            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-0">
                                <h2 className="text-xl mx-4 sm:text-2xl font-bold mb-4 text-center lg:text-left sm:mx-8 md:mx-16 lg:mx-20">
                                    Search Results
                                </h2>
                                <BrowseResult movies={result} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center mt-4 text-center text-sm sm:text-base">
                            No results found.
                        </div>
                    )
                ) : (
                    <div className="flex justify-center mt-4 text-center text-sm sm:text-base">
                        Search for movies or series...
                    </div>
                )}
            </div>

            {/* Genre Rows */}
            <div className="flex-col justify-center mx-4 sm:mx-8 md:mx-16 lg:mx-20">
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

export default BrowsePage;
