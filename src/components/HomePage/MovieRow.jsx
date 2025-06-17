import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies, viewAllLink }) {
    const movieRowRef = useRef(null);
    const [scrollAmount, setScrollAmount] = useState(0);

    // Mengatur scrollAmount berdasarkan lebar kontainer
    useEffect(() => {
        const updateScrollAmount = () => {
            if (movieRowRef.current) {
                const containerWidth = movieRowRef.current.offsetWidth;
                setScrollAmount(containerWidth * 0.8); // scroll 80% dari lebar tampilan
            }
        };

        updateScrollAmount(); // pertama kali

        // Update saat resize layar
        window.addEventListener("resize", updateScrollAmount);
        return () => window.removeEventListener("resize", updateScrollAmount);
    }, []);

    const handleScroll = (direction) => {
        const container = movieRowRef.current;
        if (!container) return;

        if (direction === "prev") {
            container.scrollTo({
                left: container.scrollLeft - scrollAmount,
                behavior: "smooth",
            });
        } else if (direction === "next") {
            container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="flex flex-col py-6">
            {/* Header */}
            <div className="flex flex-wrap gap-2 justify-between items-center mb-4 px-4 sm:px-8 md:px-16">
                <h3 className="text-lg sm:text-xl font-bold tracking-wider text-white">
                    {title}
                </h3>
                <hr className="flex-grow mx-4 md:block border-t border-gray-600" />
                <Link
                    to={viewAllLink}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm sm:text-base h-9 sm:h-10 flex items-center"
                >
                    View All
                </Link>
            </div>

            {/* Movie Carousel */}
            <div className="flex items-center relative">
                {/* Tombol kiri */}
                <button
                    type="button"
                    className="hidden sm:flex absolute left-0 z-10 bg-gray-600/80 text-white rounded-full w-8 sm:w-10 h-14 sm:h-20 items-center justify-center hover:bg-gray-700 transition-colors text-xl sm:text-2xl font-bold"
                    aria-label="Previous"
                    onClick={() => handleScroll("prev")}
                >
                    &lt;
                </button>

                {/* Scrollable Row */}
                <div
                    ref={movieRowRef}
                    className="flex overflow-x-auto gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 scrollbar-hide scroll-smooth"
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            movieTitle={movie.title}
                            imgSource={movie.imgSource}
                            id={movie.id}
                        />
                    ))}
                </div>

                {/* Tombol kanan */}
                <button
                    type="button"
                    className="hidden sm:flex absolute right-0 z-10 bg-gray-600/80 text-white rounded-full w-8 sm:w-10 h-14 sm:h-20 items-center justify-center hover:bg-gray-700 transition-colors text-xl sm:text-2xl font-bold"
                    aria-label="Next"
                    onClick={() => handleScroll("next")}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default MovieRow;
