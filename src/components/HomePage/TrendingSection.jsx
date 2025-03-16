import MovieCard from "./MovieCard";
import joker from '/src/assets/MoviePosters/Joker.png';
import moana2 from '/src/assets/MoviePosters/Moana 2.png';
import spiritedAway from '/src/assets/MoviePosters/Spirited Away.png';
import mandalorian from '/src/assets/MoviePosters/The Mandalorian.png';

function TrendingSection() {
    return (
        <div className="flex-col justify-center mb-10">
            <h1 className="text-4xl font-bold ml-20 my-8 tracking-[0.15em]">TRENDING NOW</h1>

            {/* Trending Row */}
            <div className="flex justify-center">
                <div className="flex bg-[#302E3B] w-11/12 rounded-lg overflow-hidden">
                    <div className="flex justify-evenly w-full mt-14 mb-8">
                        <MovieCard movieTitle="JOKER" imgSource={joker} number="1" />
                        <MovieCard movieTitle="MOANA 2" imgSource={moana2} number="2" />
                        <MovieCard movieTitle="SPIRITED AWAY" imgSource={spiritedAway} number="3" />
                        <MovieCard movieTitle="THE MANDALORIAN" imgSource={mandalorian} number="4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingSection;