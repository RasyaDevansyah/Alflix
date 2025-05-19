import React, { useEffect, useState } from "react";
import Navbar from '../../components/HomePage/Navbar';
import MovieRow from '../../components/HomePage/MovieRow';
import Footer from '../../components/Footer';
import MovieCard from "../../components/HomePage/MovieCard";

// Dummy data, ganti dengan fetch dari API/backend jika sudah tersedia
const dummyAnimeVideos = [
    {
        id: 1,
        title: "Attack on Titan",
        poster: "/images/aot.jpg",
        description: "Anime tentang pertempuran melawan titan.",
    },
    {
        id: 2,
        title: "Demon Slayer",
        poster: "/images/demonslayer.jpg",
        description: "Petualangan Kamado Tanjiro melawan iblis.",
    },
    // Tambahkan data anime lainnya di sini
];

const AnimePage = () => {
    const [animeVideos, setAnimeVideos] = useState([]);

    useEffect(() => {
        // Jika sudah ada API, fetch data di sini
        setAnimeVideos(dummyAnimeVideos);
    }, []);

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <h1>Anime Videos</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                {animeVideos.map((anime) => (
                    <MovieCard
                        key={anime.id}
                        title={anime.title}
                        poster={anime.poster}
                        description={anime.description}
                    // Tambahkan props lain sesuai kebutuhan MovieCard
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default AnimePage;