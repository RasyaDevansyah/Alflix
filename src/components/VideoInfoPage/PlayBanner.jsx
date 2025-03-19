import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';

function PlayBanner() {
    return (
        <div className="relative">
            <div className="max-h-[801px] overflow-hidden">
                <img
                    src={beautyAndTheBeast}
                    alt="Beauty and the Beast"
                    className="w-full h-auto object-cover"
                />
            </div>

        </div>
    );
}

export default PlayBanner;