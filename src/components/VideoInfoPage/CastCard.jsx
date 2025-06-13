import React from 'react';

function CastCard({ imageSrc, castName, characterName }) {
    return (
        <div className="flex flex-col w-full sm:w-40 md:w-48 lg:w-56 h-auto flex-shrink-0">
            
            <div className="rounded-lg overflow-hidden shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
                <img 
                    src={imageSrc} 
                    alt={castName} 
                    className="w-full h-60 object-cover"
                />
            </div>

            {/* Cast Name */}
            <p className="mt-2 text-sm md:text-base font-bold tracking-wider">{castName}</p>

            {/* Character Name */}
            <p className="text-xs text-[#B8B1FF] tracking-wider">{characterName}</p>
        </div>
    );
}

export default CastCard;
