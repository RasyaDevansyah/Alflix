import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/HomePage/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/HomePage/MovieCard";
import SearchBar from '../../components/Search/SearchBar.jsx';

function CategoryPage() {
    const [searchResult, setSearchResult] = useState(null);
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoviesByCategory = async () => {
            if (!category) {
                setError("Category not specified.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // Convert category from URL to lowercase for the API call
                const formattedCategory = category.toLowerCase();
                const response = await fetch(`/api/movies?tag=${formattedCategory}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch movies for category ${category}`);
                }

                const data = await response.json();
                setMovies(data.data || []);
                setSearchResult(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByCategory();
    }, [category]);

    const handleSearch = (filteredMovies) => {
        if (!filteredMovies || filteredMovies.length === 0) {
            setSearchResult(null);
        } else {
            setSearchResult(filteredMovies);
        }
    };

    const displayMovies = searchResult !== null ? searchResult : movies;

    if (error) {
        return (
            <div className="min-h-screen bg-[#1e1e2a] text-white flex flex-col">
                <Navbar />
                <div className="mx-20 my-8 flex-grow flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <div className="mx-20 my-8">
                <h1 className="text-3xl font-bold mt-10 mb-5 capitalize">{category}</h1>
                <SearchBar
                    searchResult={handleSearch}
                    setIsSearchActive={() => {}}
                    movies={movies}
                />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading movies...</p>
                    </div>
                ) : displayMovies.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p>No movies found in this category.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-[20px] mt-[16px]">
                        {displayMovies.map((movie, idx) => (
                            <MovieCard
                                key={movie._id || idx}
                                movieTitle={movie.title}
                                imgSource={movie.poster}
                                id = {movie._id}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default CategoryPage;

