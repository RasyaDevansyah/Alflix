import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movieTitle, imgSource, number, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the VideoInfoPage with the movie ID
        navigate(`/VideoInfoPage/${id}`);
    }

    return (
        <div className="w-30 sm:w-35 md:w-40 lg:w-60 h-auto relative flex-shrink-0">
            {/* Number Badge */}
            {number && (
                <div className="absolute top-1 left-2 z-10 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    {number}
                </div>
            )}

            {/* Movie Poster and Details */}
            <div className="flex flex-col items-center mb-2 mt-3 group cursor-pointer transition-transform hover:scale-105">

                <div
                    className="w-full mt-3 sm:mt-4 text-left px-1"
                    onClick={handleClick}
                    role='button'
                    tabIndex={0}
                >
                    {/* Poster Image */}
                    <div className="w-auto h-45 sm:h-65 md:h-75 lg:h-85 overflow-hidden rounded-lg shadow-lg shadow-[#FFFFFF33]">
                        <img
                            src={imgSource}
                            alt={movieTitle}
                            className="w-full h-full object-cover"
                            loading='lazy'
                        />
                    </div>
                    <p
                        className="text-white text-sm sm:text-base md:text-lg font-bold overflow-hidden text-ellipsis whitespace-normal"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                        title={movieTitle}
                    >
                        {movieTitle}
                    </p>
                    <div className="text-sm sm:text-base text-violet-500 tracking-[0.15em] group-hover:underline">
                        Watch &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
