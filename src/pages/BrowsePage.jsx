import Navbar from '../components/HomePage/Navbar';
import SearchBar from '../components/Search/SearchBar.jsx';
import Footer from '../components/Footer';
import MovieRow from '../components/HomePage/MovieRow';
import { useState, useEffect } from 'react';
import BrowseResult from '../components/Search/BrowseResult.jsx';

function BrowsePage() {
    const [result, setResult] = useState(null); // State to store search results
    const [isSearchActive, setIsSearchActive] = useState(false); // State to track search bar activity
    const [allMovies, setAllMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true);

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
                    .slice(0, 4);

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
            <div className="mx-20 my-8">
                <SearchBar moviesData={allMovies} searchResult={setResult} setIsSearchActive={setIsSearchActive} />
                {result ? (
                    result.length > 0 ? (
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                            <BrowseResult movies={result} />
                        </div>
                    ) : (
                        <div className="flex justify-center mt-4">No results found.</div>
                    )
                ) : (
                    <div className="display flex justify-center mt-4">Search for movies or series...</div>
                )}
            </div>
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

export default BrowsePage;