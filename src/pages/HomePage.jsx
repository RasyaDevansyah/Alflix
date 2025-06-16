import Navbar from '../components/HomePage/Navbar';
import Banner from '../components/HomePage/Banner';
import TrendingSection from '../components/HomePage/TrendingSection';
import MovieRow from '../components/HomePage/MovieRow';
import Footer from '../components/Footer';
import SearchBar from '../components/Search/SearchBar.jsx';
import SearchResult from '../components/Search/SearchResult.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../components/Context/AuthContext.jsx';

function HomePage() {
    const [result, setResult] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allMovies, setAllMovies] = useState([]);
    
    const { user } = useAuth();
    const [recommendedMovies, setRecomendedMovies] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    useEffect(() => {
        if (user && user.id) {
            fetch(`/api/users/${user.id}/details`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        // Extract genre counts with their IDs
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

                        // Convert to array, sort by count, and take top 3
                        const topGenres = Object.entries(genreCounts)
                            .sort((a, b) => b[1].count - a[1].count)
                            .slice(0, 4)
                            .map(([id, data]) => ({ id, ...data }));

                        setTopGenres(topGenres);
                    }
                })
                .catch((err) => console.error("Failed to fetch user details:", err));
        }
    }, [user]);

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            if (topGenres.length === 0) return;

            try {
                // Create query string with genre IDs sorted by most watched
                const genreQuery = topGenres.map(g => g.id).join(',');
                console.log(topGenres)
                const bodyData = {};
                topGenres.forEach(g => {
                    bodyData[g.id] = g.count;
                });

                const response = await fetch(`/api/movies?tagId=${genreQuery}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData)
                });



                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Sort movies based on genre popularity (optional)
                const recommended = data.data.slice(0, 10); // Take top 10 recommended

                setRecomendedMovies(recommended);
            } catch (err) {
                console.error("Failed to fetch recommendations:", err);
            }
        };

        fetchRecommendedMovies();
    }, [topGenres]);

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
                {recommendedMovies && recommendedMovies.length > 0 && (
                    <MovieRow
                        key={"Recommended"}
                        title={"Recommended For You"}
                        movies={recommendedMovies.map(formatMovieData)}
                        viewAllLink={`/category/Recommended`}
                    />
                )}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading...</p>
                    </div>
                ) :
                    (
                        Object.entries(genreMovies).map(([genreName, movies]) => (
                            <MovieRow
                                key={genreName}
                                title={genreName}
                                movies={movies.map(formatMovieData)}
                                viewAllLink={`/category/${genreName}`}
                            />
                        ))
                    )
                }
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;
