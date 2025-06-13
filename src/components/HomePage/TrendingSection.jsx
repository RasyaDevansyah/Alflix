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
            <h1 className="text-4xl font-bold ml-20 my-8 tracking-[0.15em]">TRENDING NOW</h1>

            {/* Trending Row */}
            <div className="flex justify-center">
                <div className="flex bg-[#302E3B] w-11/12 rounded-lg overflow-hidden">
                    <div className="flex justify-evenly w-full mt-14 mb-8">
                        {trendingMovies.slice(0, 4).map((movie, index) => (
                            <MovieCard 
                                key={movie._id}
                                movieTitle={movie.title.toUpperCase()} 
                                imgSource={movie.poster} 
                                number={(index + 1).toString()}
                                id = {movie._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingSection;