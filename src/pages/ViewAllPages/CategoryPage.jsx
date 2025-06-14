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
            setSearchResult(movies);
        } else {
            setSearchResult(filteredMovies);
        }
    };

    const displayMovies = searchResult !== null ? searchResult : movies;

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />

            {/* MOBILE / TABLET SearchBar */}
            <div className="block lg:hidden mx-4 sm:mx-8 md:mx-16 my-4">
                <SearchBar
                    moviesData={movies}
                    searchResult={handleSearch}
                    setIsSearchActive={() => { }}
                    isCategoryPage={true}
                />
            </div>

            {/* DESKTOP SearchBar (fixed position) */}
            <div className="hidden lg:block mb-6">
                <SearchBar
                    moviesData={movies}
                    searchResult={handleSearch}
                    setIsSearchActive={() => { }}
                />
            </div>

            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-4">
                <h1 className="text-3xl font-bold mt-10 mb-5 capitalize">{category}</h1>



                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading movies...</p>
                    </div>
                ) : displayMovies.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p>No movies found in this category.</p>
                    </div>
                ) : (
                    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center lg:justify-items-start">
                        {displayMovies.map((movie, idx) => (
                            <div key={movie._id || idx} className="text-center lg:text-left">
                                <MovieCard
                                    movieTitle={movie.title}
                                    imgSource={movie.poster}
                                    id={movie._id}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default CategoryPage;
