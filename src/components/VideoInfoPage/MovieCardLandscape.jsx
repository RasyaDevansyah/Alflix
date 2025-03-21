import React from 'react';

function MovieCardLandscape({ imageSrc, movieTitle }) {
    return (
        <div className="flex flex-col relative flex-shrink-0">
            {/* Picture card */}
            <div className="w-80 h-48 rounded-lg overflow-hidden">
                <img 
                    src={imageSrc} 
                    alt="Movie Image" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Cast Name */}
            <p className="mt-1 text-xl leading-[1.6] tracking-[0.15em] font-bold">{movieTitle}</p>

            {/* Character Name */}
            <p className="text-sm text-[#B8B1FF] tracking-[0.15em]">{"watch >"}</p>
        </div>
    );
}

export default MovieCardLandscape;