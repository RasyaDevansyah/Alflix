import React, { useEffect, useState } from "react";
import Navbar from '../../components/HomePage/Navbar';
import MovieRow from '../../components/HomePage/MovieRow';
import Footer from '../../components/Footer';
import MovieCard from "../../components/HomePage/MovieCard";
import { useAuth } from "../../components/Context/AuthContext";

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
    const [userDetails, setUserDetails] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.id) {
            fetch(`/api/users/${user.id}/details`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUserDetails(data.data);
                        console.log("User Details:", data.data);
                    }
                })
                .catch((err) => console.error("Failed to fetch user details:", err));
        }
    }, [user]);

    const recentWatches = userDetails?.history?.map(item => ({
        id: item.movieId._id,
        title: item.movieId.title,
        image: item.movieId.imgHeader,
        timestamp: item.timestamp
    })) || [];

    recentWatches.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    console.log("Recent Watches:", recentWatches);

    return (
        <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
            <Navbar />

            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-4">
                <h1 className="text-3xl font-bold mt-10 mb-5 capitalize">Watch History</h1>
                <div className="grid gap-5 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 justify-items-center lg:justify-items-start">
                    {recentWatches.map((video) => (
                        <MovieCard
                            id={video.id}
                            movieTitle={video.title}
                            imgSource={video.image}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryPage;