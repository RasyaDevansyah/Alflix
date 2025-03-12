import AlflixLogo from "../components/AlflixLogo"

function HomePage() {


    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white">

            {/* Navbar */}
            <div className="flex h-14 justify-between">
                {/* Navbar Left */}
                <div className="flex items-center">
                    <AlflixLogo type='2' className="w-1/5 h-auto mr-4 ml-3"/>
                    <div className="h-9 w-px bg-white mx-4"></div>
                    <p className="mx-4 font-bold ">HOME</p>
                    <p className="mx-4 font-bold">BROWSE</p>
                    <p className="mx-4 font-bold">SUBSCRIPTION</p>

                </div>

                {/* Navbar Right */}
                <div className="flex items-center">
                    <p className="mx-4">right1</p>
                    <p className="mx-4">right2</p>
                    <p className="mx-4">right3</p>
                </div>


            </div>




            <div className="banner">
                <p>bannerrrrrrrrrrrrrrr</p>
            </div>

            <div className="trendingsection">
                <p>Trending Section</p>

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