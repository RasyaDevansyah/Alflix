import { Link } from "react-router-dom";

const MovieCard = ({ movieTitle, imgSource, number, id }) => {
    return (
        <div className="w-40 sm:w-48 md:w-56 lg:w-60 h-auto relative flex-shrink-0">
            {/* Number Badge */}
            {number && (
                <div className="absolute top-1 left-2 z-10 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    {number}
                </div>
            )}

            {/* Movie Poster and Details */}
            <div className="flex flex-col items-center">
                {/* Poster Image */}
                <div className="w-full h-60 sm:h-72 md:h-80 lg:h-90 overflow-hidden rounded-lg shadow-lg shadow-[#FFFFFF33]">
                    <img
                        src={imgSource}
                        alt={movieTitle}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Movie Title and Watch Link */}
                <div className="w-full mt-3 sm:mt-4 text-left tracking-[0.1em] sm:tracking-[0.15em] pl-2">
                    <p
                        className="text-white text-sm sm:text-base md:text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                        title={movieTitle}
                    >
                        {movieTitle}
                    </p>

                    <Link
                        to={`/VideoInfoPage/${id}`}
                        className="text-violet-500 text-sm sm:text-base"
                    >
                        {"Watch >"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
