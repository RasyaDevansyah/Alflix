import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/HomePage/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/HomePage/MovieCard";
import SearchBar from '../../components/Search/SearchBar.jsx';
import { useAuth } from "../../components/Context/AuthContext.jsx";

function CategoryPage() {
    const [searchResult, setSearchResult] = useState(null);
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [topGenres, setTopGenres] = useState([]);

    // Fetch user details and top genres
    useEffect(() => {
        if (user && user.id) {
            fetch(`/api/users/${user.id}/details`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        const genreCounts = {};
                        data.data.history?.forEach(item => {
                            item.movieTags.forEach(tag => {
                                if (!genreCounts[tag.tagId]) {
                                    genreCounts[tag.tagId] = {
                                        count: 0,
                                        name: tag.tagName
                                    };
                                }
                                genreCounts[tag.tagId].count++;
                            });
                        });

                        const topGenres = Object.entries(genreCounts)
                            .sort((a, b) => b[1].count - a[1].count)
                            .slice(0, 4) // Get top 3 genres
                            .map(([id, data]) => ({ id, ...data }));

                        setTopGenres(topGenres);
                    }
                })
                .catch(console.error);
        }
    }, [user]);

    // Fetch recommended movies when topGenres changes
    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            if (topGenres.length === 0) return;

            try {
                // Get just the genre IDs
                const genreIds = topGenres.map(g => g.id);
                
                // Fetch movies for all recommended genres at once
                const response = await fetch(`/api/movies?tagId=${genreIds.join(',')}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Simple sorting - movies that match more of the top genres first
                const sortedMovies = data.data.sort((a, b) => {
                    const aScore = a.tags.filter(tag => genreIds.includes(tag.tagId)).length;
                    const bScore = b.tags.filter(tag => genreIds.includes(tag.tagId)).length;
                    return bScore - aScore;
                }).slice(0, 50); // Take top 10

                setRecommendedMovies(sortedMovies);
            } catch (err) {
                console.error("Failed to fetch recommendations:", err);
                setRecommendedMovies([]); // Fallback to empty array
            }
        };

        fetchRecommendedMovies();
    }, [topGenres]);

    // Main movie fetching logic
    useEffect(() => {
        const fetchMoviesByCategory = async () => {
            if (!category) {
                setError("Category not specified.");
                setLoading(false);
                return;
            }

            setLoading(true);
            
            try {
                if (category.toLowerCase() === "recommended") {
                    // Use the pre-fetched recommended movies
                    setMovies(recommendedMovies);
                } else {
                    // Regular category fetch
                    const response = await fetch(`/api/movies?tag=${category.toLowerCase()}`);
                    
                    if (!response.ok) {
                        throw new Error(`Failed to fetch movies for category ${category}`);
                    }

                    const data = await response.json();
                    setMovies(data.data || []);
                }
                setSearchResult(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByCategory();
    }, [category, recommendedMovies]);

    const handleSearch = (filteredMovies) => {
        setSearchResult(filteredMovies?.length > 0 ? filteredMovies : null);
    };

    const displayMovies = searchResult !== null ? searchResult : movies;

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />

            {/* Search Bars */}
            <div className="block lg:hidden mx-4 sm:mx-8 md:mx-16 my-4">
                <SearchBar
                    moviesData={movies}
                    searchResult={handleSearch}
                    setIsSearchActive={() => {}}
                    isCategoryPage={true}
                />
            </div>
            <div className="hidden lg:block mb-6">
                <SearchBar
                    moviesData={movies}
                    searchResult={handleSearch}
                    setIsSearchActive={() => {}}
                />
            </div>

            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-4">
                <h1 className="text-3xl font-bold mt-10 mb-5 capitalize">
                    {category === "recommended" ? "Recommended For You" : category}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading movies...</p>
                    </div>
                ) : displayMovies.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p>
                            {category === "recommended" 
                                ? "No recommendations available. Watch more movies to get personalized recommendations."
                                : "No movies found in this category."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-items-center lg:justify-items-start">
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