import Navbar from "../components/HomePage/Navbar"
import PlayBanner from "../components/VideoInfoPage/PlayBanner"
import Footer from "../components/Footer"

import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';

import CastCard from "../components/VideoInfoPage/CastCard";
import EmmaWatson from '/src/assets/MovieCasts/Emma Watson.png';

function VideoInfoPage() {


    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
            <Navbar />
            <PlayBanner />

            {/* Title Section */}
            <div className="flex gap-18 py-8 px-24">
                {/* Left Side - 50% width */}
                <div className="w-1/2 -mt-43 relative z-10">
                    <div className="relative overflow-hidden rounded-lg h-110 w-165 shadow-[0_0_35px_15px_rgba(255,255,255,0.2)]">
                        <img
                            src={beautyAndTheBeast}
                            alt="Beauty and the beast picture"
                            className="absolute w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side - 50% width */}
                <div className="w-1/2 flex flex-col justify-between">
                    <h1 className="text-7xl font-bold mb-4 tracking-[0.15em] leading-[1.2]">BEAUTY AND THE BEAST</h1>
                    <div className="mb-4">
                        <h4 className="text-xl font-bold tracking-[0.15em]">2020 | 7.9 ★</h4>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <p className="bg-[#333] px-3 py-1 rounded-full">Romance</p>
                        <p className="bg-[#333] px-3 py-1 rounded-full">Fantasy</p>
                        <p className="bg-[#333] px-3 py-1 rounded-full">Disney</p>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="flex pb-8 px-24 tracking-[0.15em] gap-8">
                <div className="w-3/4">
                    <p className="text-xl font-bold mb-3">Description:</p>
                    <p className="text-xl leading-[1.6] font-light">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className="w-px bg-white/80 h-40 self-center"></div>
                <div className="w-1/4 pl-8 flex items-center justify-center">
                    <p className="text-3xl italic font-bold leading-[1.6]">
                        “Come and<br />
                        see the<br />
                        magic<br />
                        bestowed.”
                    </p>
                </div>
            </div>

            {/* Cast Section */}
            <div className="pb-8 px-24">
                <p className="text-xl font-bold mb-3 tracking-[0.15em]">Starring:</p>
                <div
                    // -mx-24 px-24
                    className="flex gap-10 overflow-x-scroll py-2 custom-scrollbar "
                >
                    <CastCard
                        imageSrc={EmmaWatson}
                        castName="Emma Watson"
                        characterName="Belle"
                    />
                    <CastCard
                        imageSrc={EmmaWatson}
                        castName="Emma Watson"
                        characterName="Belle"
                    />
                    <CastCard
                        imageSrc={EmmaWatson}
                        castName="Emma Watson"
                        characterName="Belle"
                    />
                    <CastCard
                        imageSrc={EmmaWatson}
                        castName="Emma Watson"
                        characterName="Belle"
                    />
                    <CastCard
                        imageSrc={EmmaWatson}
                        castName="Emma Watson"
                        characterName="Belle"
                    />
                </div>

            </div>

            {/* More Like this Section */}
            <div>
                {/* Add content here */}
            </div>

            <Footer />
        </div>
    );
}

export default VideoInfoPage;