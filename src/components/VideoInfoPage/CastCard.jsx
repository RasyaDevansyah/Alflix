import React from 'react';

function CastCard({ imageSrc, castName, characterName }) {
    return (
        <div className="flex flex-col gap-y-1 w-45 h-70">
            {/* Picture card */}
            <div className="max-w-45 max-h-55 rounded-lg overflow-hidden shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
                <img 
                    src={imageSrc} 
                    alt="ActorImage" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Cast Name */}
            <p className="text-white font-semibold">{castName}</p>

            {/* Character Name */}
            <p className="text-sm text-[#B8B1FF]">{characterName}</p>
        </div>
    );
}

export default CastCard;