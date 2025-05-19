import React, { useEffect, useState } from "react";
import Navbar from '../../components/HomePage/Navbar';
import MovieRow from '../../components/HomePage/MovieRow';
import Footer from '../../components/Footer';
import MovieCard from "../../components/HomePage/MovieCard";

// Dummy data, ganti dengan fetch dari API/backend jika sudah tersedia
const dummyHistoryVideos = [
    {
        id: 1,
        title: "Avengers: Endgame",
        poster: "/images/avengers.jpg",
        description: "Pertarungan epik para Avengers.",
    },
    {
        id: 2,
        title: "Venom",
        poster: "/images/venom.jpg",
        description: "Kisah antihero Venom.",
    },
    // Tambahkan data history lainnya di sini
];

const HistoryPage = () => {
    const [historyVideos, setHistoryVideos] = useState([]);

    useEffect(() => {
        setHistoryVideos(dummyHistoryVideos);
    }, []);

    return (
         <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <h1>Watch History</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                {historyVideos.map((video) => (
                    <MovieCard
                        key={video.id}
                        title={video.title}
                        poster={video.poster}
                        description={video.description}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default HistoryPage;