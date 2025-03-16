import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieRowRef = useRef(null);

    const handleScroll = (direction) => {
        const container = movieRowRef.current;
        const scrollAmount = 300; // Adjust this value to control how much to scroll

        if (direction === "prev") {
            container.scrollTo({
                left: scrollPosition - scrollAmount,
                behavior: "smooth",
            });
            setScrollPosition((prev) => Math.max(prev - scrollAmount, 0));
        } else if (direction === "next") {
            container.scrollTo({
                left: scrollPosition + scrollAmount,
                behavior: "smooth",
            });
            setScrollPosition((prev) => prev + scrollAmount);
        }
    };

    return (
        <div className="flex flex-col py-6">
            {/* Row Header */}
            <div className="flex justify-between items-center mb-5 px-16">
                <h3 className="text-xl font-bold tracking-[0.18em]">{title}</h3>
                <hr className="flex-grow mx-4 border-t border-gray-600" />
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors h-10"
                >
                    View All
                </button>
            </div>

            {/* Movie Row with Carousel Buttons */}
            <div className="flex items-center relative">
                <button
                    type="button"
                    className="absolute left-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                    aria-label="Previous"
                    onClick={() => handleScroll("prev")}
                >
                    &lt;
                </button>

                <div
                    ref={movieRowRef}
                    className="flex overflow-x-auto gap-10 px-12 scrollbar-hide"
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            movieTitle={movie.title}
                            imgSource={movie.imgSource}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className="absolute right-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
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