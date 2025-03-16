import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';

function Banner() {
    return (
        <div className="relative">
            <div className="max-h-[801px] overflow-hidden">
                <img
                    src={beautyAndTheBeast}
                    alt="Beauty and the Beast"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Text positioned at the bottom left */}
            <div className="absolute bottom-10 left-6 text-white">
                <h3 className="text-4xl font-bold mb-2 tracking-[0.15em]">PREMIER</h3>
                <p className="text-lg tracking-[0.15em]">Starting in...</p>
                <p className="text-2xl font-semibold tracking-[0.15em]">16:01:24</p>
            </div>
        </div>
    );
}

export default Banner;