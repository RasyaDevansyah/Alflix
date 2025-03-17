import avengers from '/src/assets/MoviePosters/Avengers.png';
import venom from '/src/assets/MoviePosters/Venom.png';
import thorRagnarook from '/src/assets/MoviePosters/ThorRagnarok.png';
import blackPanter from '/src/assets/MoviePosters/BlackPanter.png';

import jujutsuKaisen0 from '/src/assets/MoviePosters/JUJUTSU KAISEN 0.png';
import onePiece from '/src/assets/MoviePosters/One Piece Red.png';
import luca from '/src/assets/MoviePosters/Luca.png';
import cinderella from '/src/assets/MoviePosters/Cinderella.png';

import hunterXHunter from '/src/assets/MoviePosters/Hunter X Hunter.png';
import mobPyscho from '/src/assets/MoviePosters/Mob Pyscho 100.png';
import blueLock from '/src/assets/MoviePosters/Blue Lock.png';
import fairyTail from '/src/assets/MoviePosters/Fairy Tail.png';


import Navbar from '../components/HomePage/Navbar';
import Banner from '../components/HomePage/Banner';
import TrendingSection from '../components/HomePage/TrendingSection';
import MovieRow from '../components/HomePage/MovieRow';
import Footer from '../components/Footer';

function HomePage() {


    // INI PERUBAHAN BARUUUUUUUUU
    // haloooo
    // test

    const watchHistoryMovies = [
        { title: "AVENGERS", imgSource: avengers },
        { title: "VENOM", imgSource: venom },
        { title: "THOR: RAGNAROK", imgSource: thorRagnarook },
        { title: "BLACK PANTER", imgSource: blackPanter },
        { title: "BLACK PANTER", imgSource: blackPanter },
        { title: "BLACK PANTER", imgSource: blackPanter },
        { title: "BLACK PANTER", imgSource: blackPanter },
    ];

    const latestReleasesMovies = [
        { title: "JUJUTSU KAISEN 0", imgSource: jujutsuKaisen0 },
        { title: "ONE PIECE: RED", imgSource: onePiece },
        { title: "LUCA", imgSource: luca },
        { title: "CINDERELLA", imgSource: cinderella },
        { title: "CINDERELLA", imgSource: cinderella },
        { title: "CINDERELLA", imgSource: cinderella },
        { title: "CINDERELLA", imgSource: cinderella },
        { title: "CINDERELLA", imgSource: cinderella },
    ];

    const animeSeriesMovies = [
        { title: "HUNTER X HUNTER", imgSource: hunterXHunter },
        { title: "MOB PSYCHO 100", imgSource: mobPyscho },
        { title: "BLUE LOCK", imgSource: blueLock },
        { title: "FAIRY TAIL", imgSource: fairyTail },
        { title: "FAIRY TAIL", imgSource: fairyTail },
        { title: "FAIRY TAIL", imgSource: fairyTail },
        { title: "FAIRY TAIL", imgSource: fairyTail },
        { title: "FAIRY TAIL", imgSource: fairyTail },
    ];

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
            <Navbar />
            <Banner />
            <TrendingSection />
            <div className="flex-col justify-center mx-20">
                <MovieRow title="Based on Your Watch History" movies={watchHistoryMovies} />
                <MovieRow title="Latest Releases" movies={latestReleasesMovies} />
                <MovieRow title="Anime Series" movies={animeSeriesMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;