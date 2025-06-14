import { useEffect, useState } from 'react';

function Banner() {
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
        return <div className="flex justify-center my-8">Loading trending image...</div>;
    }

    if (error) {
        return <div className="flex justify-center my-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="relative w-full flex justify-center items-center">
            <div className="w-full max-h-[801px] overflow-hidden flex justify-center items-center">
                <img
                    src={trendingMovies[0].imgSubheader}
                    alt={trendingMovies[0].title}
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[801px] object-cover"
                />
            </div>
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 text-white">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider drop-shadow-lg">
                    TRENDING: {trendingMovies[0].title.toUpperCase()}
                </h3>
            </div>
        </div>
    );
}

export default Banner;
