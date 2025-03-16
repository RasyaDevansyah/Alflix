const MovieCard = ({ movieTitle, imgSource, number }) => {
    return (
        <div className="w-60 h-106 relative flex-shrink-0"> {/* Adjusted width and height */}
            {/* Number Badge */}
            {number && (
                <div className="absolute -top-8 -left-2 z-10 text-white text-8xl font-bold">
                    {number}
                </div>
            )}

            {/* Movie Poster and Details */}
            <div className="flex flex-col items-center">
                {/* Poster Image */}
                <div className="w-full h-90 overflow-hidden rounded-lg shadow-lg shadow-[#FFFFFF33]">
                    <img
                        src={imgSource}
                        alt={movieTitle}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Movie Title and Watch Link */}
                <div className="w-full mt-4 text-left tracking-[0.15em] pl-2">
                    <p className="text-white font-bold">{movieTitle}</p>
                    <p className="text-violet-500">{"Watch >"}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;