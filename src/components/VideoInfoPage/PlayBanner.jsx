import beautyAndTheBeast2 from '/src/assets/BeautyAndTheBeast2.png';

function PlayBanner() {
    return (
        <div className="relative">
            <div className="max-h-[701px] overflow-hidden">
                <img
                    src={beautyAndTheBeast2}
                    alt="Beauty and the Beast"
                    className="w-full h-auto object-cover"
                />
            </div>

        </div>
    );
}

export default PlayBanner;