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
        <div className="relative flex justify-center items-center">
            <div className="max-h-[801px] overflow-hidden flex justify-center items-center w-full">
                <img
                    src={trendingMovies[0].imgSubheader}
                    alt="Beauty and the Beast"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="absolute bottom-10 left-6 text-white">
                <h3 className="text-4xl font-bold mb-2 tracking-[0.15em]">
                    TRENDING: {trendingMovies[0].title.toUpperCase()}
                </h3>
            </div>
        </div>
    );
}

export default Banner;