import { useEffect, useState } from 'react';
import MovieCard from "./MovieCard";

function TrendingSection() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch('/api/movies/trending');
                if (!response.ok) {
                    throw new Error('Failed to fetch trending movies');
                }
                const data = await response.json();
                setTrendingMovies(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (loading) {
        return <div className="flex justify-center my-8">Loading trending movies...</div>;
    }

    if (error) {
        return <div className="flex justify-center my-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex-col justify-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ml-4 sm:ml-10 md:ml-20 my-6 sm:my-8 tracking-wider text-white">
                TRENDING NOW
            </h1>

            <div className="flex justify-center">
                <div className="bg-[#302E3B] w-11/12 rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
                    
                    {/* Mobile & Tablet: Horizontal Scroll */}
                    <div className="flex lg:hidden gap-6 overflow-x-auto scrollbar-hide scroll-smooth">
                        {trendingMovies.slice(0, 4).map((movie, index) => (
                            <div key={movie._id} className="min-w-[220px] flex-shrink-0">
                                <MovieCard
                                    movieTitle={movie.title.toUpperCase()}
                                    imgSource={movie.poster}
                                    number={(index + 1).toString()}
                                    id={movie._id}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Desktop only: Grid */}
                    <div className="hidden lg:grid grid-cols-4 gap-6">
                        {trendingMovies.slice(0, 4).map((movie, index) => (
                            <MovieCard
                                key={movie._id}
                                movieTitle={movie.title.toUpperCase()}
                                imgSource={movie.poster}
                                number={(index + 1).toString()}
                                id={movie._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingSection;
