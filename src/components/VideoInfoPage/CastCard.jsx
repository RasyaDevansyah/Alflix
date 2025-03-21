import React from 'react';

function CastCard({ imageSrc, castName, characterName }) {
    return (
        <div className="flex flex-col w-70 h-80 relative flex-shrink-0">
            {/* Picture card */}
            <div className="max-w-70 max-h-75 rounded-lg overflow-hidden shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
                <img 
                    src={imageSrc} 
                    alt="ActorImage" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Cast Name */}
            <p className="mt-1 text-xl leading-[1.6] tracking-[0.15em] font-bold">{castName}</p>

            {/* Character Name */}
            <p className="text-sm text-[#B8B1FF] tracking-[0.15em]">{characterName}</p>
        </div>
    );
}

export default CastCard;