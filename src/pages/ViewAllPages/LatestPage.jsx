import React, { useEffect, useState } from "react";
import Navbar from '../../components/HomePage/Navbar';
import MovieRow from '../../components/HomePage/MovieRow';
import Footer from '../../components/Footer';
import MovieCard from "../../components/HomePage/MovieCard";

// Dummy data, ganti dengan fetch dari API/backend jika sudah tersedia
const dummyLatestVideos = [
    {
        id: 1,
        title: "Jujutsu Kaisen 0",
        poster: "/images/jujutsu.jpg",
        description: "Film terbaru dari Jujutsu Kaisen.",
    },
    {
        id: 2,
        title: "One Piece: Red",
        poster: "/images/onepiece.jpg",
        description: "Petualangan terbaru kru Topi Jerami.",
    },
    // Tambahkan data terbaru lainnya di sini
];

const LatestPage = () => {
    const [latestVideos, setLatestVideos] = useState([]);

    useEffect(() => {
        setLatestVideos(dummyLatestVideos);
    }, []);

    return (
         <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />
            <h1>Latest Videos</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                {latestVideos.map((video) => (
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

export default LatestPage;