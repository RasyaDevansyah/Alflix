import Navbar from "../components/HomePage/Navbar"
import PlayBanner from "../components/VideoInfoPage/PlayBanner"
import Footer from "../components/Footer"


import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';



function VideoInfoPage() {


    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
            <Navbar />

            {/* Banner */}
            <PlayBanner />

            {/* Title Section */}
            <div className="flex gap-18 py-8 px-24">
                {/* Left Side - 50% width */}
                <div className="w-1/2 -mt-43 relative z-10"> {/* Overflow into the banner */}
                    {/* Picture with 427:281 aspect ratio */}
                    <div
                        className="relative overflow-hidden rounded-lg h-110 w-165 shadow-[0_0_35px_15px_rgba(255,255,255,0.2)]"
                    >
                        <img
                            src={beautyAndTheBeast}
                            alt="Beauty and the beast picture"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side - 50% width */}
                <div className="w-1/2 flex flex-col justify-between">
                    {/* Title */}
                    <h1 className="text-7xl font-bold mb-4 tracking-[0.15em] leading-[1.2]">BEAUTY AND THE BEAST</h1>
                    <div className="mb-4">
                        <h4 className="text-xl font-bold tracking-[0.15em]">2020 | 7.9 ★</h4>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <p className="bg-[#333] px-3 py-1 rounded-full">Romance</p>
                        <p className="bg-[#333] px-3 py-1 rounded-full">Fantasy</p>
                        <p className="bg-[#333] px-3 py-1 rounded-full">Disney</p>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="flex py-8 px-24 h-40">
                {/* Left Side */}
                <div>

                </div>

                {/* Right Side */}
                <div>
                    
                </div>


            </div>


            {/* Cast Section */}
            <div>

            </div>


            {/* More Like this Section */}
            <div>

            </div>

            <Footer />





        </div>


    )

}


export default VideoInfoPage