import AlflixLogo from "../components/AlflixLogo"
import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';

function HomePage() {


    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin ">

            {/* Navbar */}
            <div className="flex h-14 justify-between">
                {/* Navbar Left */}
                <div className="flex items-center">
                    <AlflixLogo type='2' className="w-1/5 h-auto mr-4 ml-3" />
                    <div className="h-9 w-px bg-white mx-4"></div>
                    <p className="mx-4 font-bold tracking-[0.15em] ">HOME</p>
                    <p className="mx-4 font-bold tracking-[0.15em]">BROWSE</p>
                    <p className="mx-4 font-bold tracking-[0.15em]">SUBSCRIPTION</p>

                </div>

                {/* Navbar Right */}
                <div className="flex items-center">
                    <p className="mx-2">right1</p>
                    <p className="mx-2">right2</p>
                    <p className="ml-2 mr-4">USERNAME</p>
                </div>


            </div>

            {/* Banner */}
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

            {/* Trending Section */}
            <div className="flex-col justify-center h-[801px]">
                <h1 className="text-4xl font-bold ml-8 my-8 tracking-[0.15em]">TRENDING NOW</h1>

                {/* Trending Row */}
                <div className="flex justify-center">
                    <div className="flex bg-[#302E3B] w-11/12 max-h-[600px] rounded-lg overflow-hidden"> {/* Rounded corners */}
                        {/* Movie Cards */}
                        <div className="flex justify-between w-full p-6 "> {/* Add gap between cards and padding */}
                            {/* Movie Card 1 */}
                            <div className="w-80 h-120 bg-gray-700 rounded-lg"></div>
                            {/* Movie Card 2 */}
                            <div className="w-80 h-120 bg-gray-700 rounded-lg"></div>
                            {/* Movie Card 3 */}
                            <div className="w-80 h-120 bg-gray-700 rounded-lg"></div>
                            {/* Movie Card 4 */}
                            <div className="w-80 h-120 bg-gray-700 rounded-lg"></div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="movieRowsSection">

                <div className="movieRow">

                </div>

                <div className="movieRow">

                </div>

                <div className="movieRow">

                </div>



            </div>





        </div>
    )


}

export default HomePage