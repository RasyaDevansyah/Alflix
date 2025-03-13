
const MovieCard = ({ movieTitle, imgSource, number }) => {

    return (
        <div className="w-70 h-105 relative">
            <div className="absolute -top-8 -left-2 z-10 text-white text-8xl font-bold">
                {number ? number : ""}
            </div>
            <div className="flex flex-col items-center" >
                <div className="w-4/5 h-auto">
                    <img src={imgSource} alt="The Joker" className="w-full h-auto rounded-lg shadow-lg shadow-[#FFFFFF33]" />
                </div>
                <div className="w-4/5 mt-4 text-left tracking-[0.15em] pl-2">
                    <p className="text-white font-bold" >{movieTitle}</p>
                    <p className="text-violet-500" >{"Watch >"}</p>
                </div>

            </div>
        </div>


    )


}

export default MovieCard