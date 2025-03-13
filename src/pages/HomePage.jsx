import AlflixLogo from "../components/AlflixLogo"
import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';


import joker from '/src/assets/MoviePosters/Joker.png';
import moana2 from '/src/assets/MoviePosters/Moana 2.png'
import spiritedAway from '/src/assets/MoviePosters/Spirited Away.png'
import mandalorian from '/src/assets/MoviePosters/The Mandalorian.png'

import avengers from '/src/assets/MoviePosters/Avengers.png'
import venom from '/src/assets/MoviePosters/Venom.png'
import thorRagnarook from '/src/assets/MoviePosters/ThorRagnarok.png'
import blackPanter from '/src/assets/MoviePosters/BlackPanter.png'

import jujutsuKaisen0 from '/src/assets/MoviePosters/JUJUTSU KAISEN 0.png' 
import onePiece from '/src/assets/MoviePosters/One Piece Red.png'
import luca from '/src/assets/MoviePosters/Luca.png'
import cinderella from '/src/assets/MoviePosters/Cinderella.png'

import hunterXHunter from '/src/assets/MoviePosters/Hunter X Hunter.png'
import mobPyscho from '/src/assets/MoviePosters/Mob Pyscho 100.png' 
import blueLock from '/src/assets/MoviePosters/Blue Lock.png'
import fairyTail from '/src/assets/MoviePosters/Fairy Tail.png'



import MovieCard from "../components/HomePage/MovieCard";

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
            <div className="flex-col justify-center mb-10">
                <h1 className="text-4xl font-bold ml-20 my-8 tracking-[0.15em]">TRENDING NOW</h1>

                {/* Trending Row */}
                <div className="flex justify-center">
                    <div className="flex bg-[#302E3B] w-11/12 rounded-lg overflow-hidden"> {/* Rounded corners */}
                        {/* Movie Cards */}
                        <div className="flex justify-evenly w-full mt-14 mb-8 ">

                            {/* Movie Card 1*/}
                            <MovieCard
                                movieTitle="JOKER"
                                imgSource={joker}
                                number="1"
                            />
                            <MovieCard
                                movieTitle="MOANA 2"
                                imgSource={moana2}
                                number="2"
                            />
                            <MovieCard
                                movieTitle="SPIRITED AWAY"
                                imgSource={spiritedAway}
                                number="3"
                            />
                            <MovieCard
                                movieTitle="THE MANDALORIAN"
                                imgSource={mandalorian}
                                number="4"
                            />

                        </div>
                    </div>
                </div>
            </div>

            {/* Movie Rows Section */}
            <div className="flex-col justify-center mx-20">

                {/* Movie Row 1 */}
                <div className="flex flex-col py-6">
                    {/* Row Header */}
                    <div className="flex justify-between items-center mb-5 px-16">
                        {/* Title */}
                        <h3 className="text-xl font-bold tracking-[0.18em]">Based on Your Watch History</h3>
                        {/* Horizontal Line */}
                        <hr className="flex-grow mx-4 border-t border-gray-600" />
                        {/* View All Button */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors h-10"
                        >
                            View All
                        </button>
                    </div>
                    {/* Movie Row with Carousel Buttons */}
                    <div className="flex items-center relative">
                        {/* Left Carousel Button */}
                        <button
                            type="button"
                            className="absolute left-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Previous"
                        >
                            &lt; {/* "<" symbol */}
                        </button>

                        {/* Movie Cards */}
                        <div className="flex justify-between flex-grow overflow-x-auto space-x-4 px-12"> {/* Add padding to avoid overlap with buttons */}
                            <MovieCard
                                movieTitle="AVENGERS"
                                imgSource={avengers}
                            />
                            <MovieCard
                                movieTitle="VENOM"
                                imgSource={venom}
                            />
                            <MovieCard
                                movieTitle="THOR: RAGNAROK"
                                imgSource={thorRagnarook}
                            />
                            <MovieCard
                                movieTitle="BLACK PANTER"
                                imgSource={blackPanter}
                            />
                        </div>

                        {/* Right Carousel Button */}
                        <button
                            type="button"
                            className="absolute right-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Next"
                        >
                            &gt; {/* ">" symbol */}
                        </button>
                    </div>
                </div>

                {/* Movie Row 2 */}
                <div className="flex flex-col py-6">
                    {/* Row Header */}
                    <div className="flex justify-between items-center mb-5 px-16">
                        {/* Title */}
                        <h3 className="text-xl font-bold tracking-[0.18em]">Latest Releases</h3>
                        {/* Horizontal Line */}
                        <hr className="flex-grow mx-4 border-t border-gray-600" />
                        {/* View All Button */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors h-10"
                        >
                            View All
                        </button>
                    </div>
                    {/* Movie Row with Carousel Buttons */}
                    <div className="flex items-center relative">
                        {/* Left Carousel Button */}
                        <button
                            type="button"
                            className="absolute left-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Previous"
                        >
                            &lt; {/* "<" symbol */}
                        </button>

                        {/* Movie Cards */}
                        <div className="flex justify-between flex-grow overflow-x-auto space-x-4 px-12"> {/* Add padding to avoid overlap with buttons */}
                            <MovieCard
                                movieTitle="JUJUTSU KAISEN 0"
                                imgSource={jujutsuKaisen0}
                            />
                            <MovieCard
                                movieTitle="ONE PIECE: RED"
                                imgSource={onePiece}
                            />
                            <MovieCard
                                movieTitle="LUCA"
                                imgSource={luca}
                            />
                            <MovieCard
                                movieTitle="CINDERELLA"
                                imgSource={cinderella}
                            />
                        </div>

                        {/* Right Carousel Button */}
                        <button
                            type="button"
                            className="absolute right-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Next"
                        >
                            &gt; {/* ">" symbol */}
                        </button>
                    </div>
                </div>

                {/* Movie Row 3 */}
                <div className="flex flex-col py-6">
                    {/* Row Header */}
                    <div className="flex justify-between items-center mb-5 px-16">
                        {/* Title */}
                        <h3 className="text-xl font-bold tracking-[0.18em]">Anime Series</h3>
                        {/* Horizontal Line */}
                        <hr className="flex-grow mx-4 border-t border-gray-600" />
                        {/* View All Button */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors h-10"
                        >
                            View All
                        </button>
                    </div>
                    {/* Movie Row with Carousel Buttons */}
                    <div className="flex items-center relative">
                        {/* Left Carousel Button */}
                        <button
                            type="button"
                            className="absolute left-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Previous"
                        >
                            &lt; {/* "<" symbol */}
                        </button>

                        {/* Movie Cards */}
                        <div className="flex justify-between flex-grow overflow-x-auto space-x-4 px-12"> {/* Add padding to avoid overlap with buttons */}
                            <MovieCard
                                movieTitle="HUNTER X HUNTER"
                                imgSource={hunterXHunter}
                            />
                            <MovieCard
                                movieTitle="MOB PSYCHO 100"
                                imgSource={mobPyscho}
                            />
                            <MovieCard
                                movieTitle="BLUE LOCK"
                                imgSource={blueLock}
                            />
                            <MovieCard
                                movieTitle="FAIRY TAIL"
                                imgSource={fairyTail}
                            />
                        </div>

                        {/* Right Carousel Button */}
                        <button
                            type="button"
                            className="absolute right-0 z-10 bg-gray-600 text-white rounded-full w-10 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Next"
                        >
                            &gt; {/* ">" symbol */}
                        </button>
                    </div>
                </div>

            </div>

            {/* Footer Section */}
            <div className="h-[200px] bg-black">
            Copyright © 2025 Alflix. All rights reserved


            </div>



        </div>
    )


}

export default HomePage