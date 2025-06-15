import { Link } from 'react-router-dom';

function MovieCardLandscape({ imageSrc, movieTitle , id}) {
    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col relative flex-shrink-0 w-72 sm:w-80 group cursor-pointer transition-transform hover:scale-105">
            
            {/* Image Card */}
            <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden shadow-[0_0_10px_1px_rgba(255,255,255,0.15)]">
                <img 
                    src={imageSrc} 
                    alt={movieTitle} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Movie Title */}
            <p className="mt-2 text-lg sm:text-xl leading-[1.6] tracking-[0.15em] font-bold line-clamp-1 overflow-hidden text-ellipsis whitespace-normal">
                {movieTitle}
            </p>

            {/* Watch Label */}
            <Link 
                to={`/VideoInfoPage/${id}`}
                className="text-sm sm:text-base text-[#B8B1FF] tracking-[0.15em] group-hover:underline"
                onClick={handleLinkClick}
            >
                watch &gt;
            </Link>
        </div>
    );
}

export default MovieCardLandscape;
