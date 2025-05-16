import React, { useState } from 'react';
import avengers from '/src/assets/MoviePosters/Avengers.png';
import venom from '/src/assets/MoviePosters/Venom.png';
import thorRagnarook from '/src/assets/MoviePosters/ThorRagnarok.png';

import jujutsuKaisen0 from '/src/assets/MoviePosters/JUJUTSU KAISEN 0.png';
import onePiece from '/src/assets/MoviePosters/One Piece Red.png';
import luca from '/src/assets/MoviePosters/Luca.png';
import cinderella from '/src/assets/MoviePosters/Cinderella.png';

import hunterXHunter from '/src/assets/MoviePosters/Hunter X Hunter.png';
import mobPyscho from '/src/assets/MoviePosters/Mob Pyscho 100.png';
import blueLock from '/src/assets/MoviePosters/Blue Lock.png';
import fairyTail from '/src/assets/MoviePosters/Fairy Tail.png';

import Navbar from '../components/HomePage/Navbar';
import MovieRow from '../components/HomePage/MovieRow';
import Footer from '../components/Footer';
import SearchBar from '../components/Search/SearchBar.jsx';
import BrowseResult from '../components/Search/BrowseResult.jsx'; // Use BrowseResult to display search results

function BrowsePage() {
    const [result, setResult] = useState(null); // State to store search results
    const [isSearchActive, setIsSearchActive] = useState(false); // State to track search bar activity

    const watchHistoryMovies = [
        { title: "AVENGERS", imgSource: avengers },
        { title: "VENOM", imgSource: venom },
        { title: "THOR: RAGNAROK", imgSource: thorRagnarook },
    ];

    const latestReleasesMovies = [
        { title: "JUJUTSU KAISEN 0", imgSource: jujutsuKaisen0 },
        { title: "ONE PIECE: RED", imgSource: onePiece },
        { title: "LUCA", imgSource: luca },
        { title: "CINDERELLA", imgSource: cinderella },
    ];

    const animeSeriesMovies = [
        { title: "HUNTER X HUNTER", imgSource: hunterXHunter },
        { title: "MOB PSYCHO 100", imgSource: mobPyscho },
        { title: "BLUE LOCK", imgSource: blueLock },
        { title: "FAIRY TAIL", imgSource: fairyTail },
    ];

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <div className="mx-20 my-8">
                <SearchBar searchResult={setResult} setIsSearchActive={setIsSearchActive} />
                {result ? (
                    result.length > 0 ? (
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                            <BrowseResult movies={result} />
                        </div>
                    ) : (
                        <div className="flex justify-center mt-4">No results found.</div>
                    )
                ) : (
                    <div className="display flex justify-center mt-4">Search for movies or series...</div>
                )}
            </div>
            <div className="flex-col justify-center mx-20">
                <MovieRow title="Based on Your Watch History" movies={watchHistoryMovies} />
                <MovieRow title="Latest Releases" movies={latestReleasesMovies} />
                <MovieRow title="Anime Series" movies={animeSeriesMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default BrowsePage;