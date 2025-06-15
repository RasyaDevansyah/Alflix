import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/Footer";
import WatchHoursChart from "../components/WatchHoursChart";
import MovieAnalyticsChart from "../components/MovieAnalyticsChart";
import { FaSignOutAlt } from "react-icons/fa";

import profile from '/src/assets/profile-pic.png';
import profilebanner from '/src/assets/profile-banner.png';

import phoneIcon from '/src/assets/Phone.png';
import computerIcon from '/src/assets/Computer.png';
import { useAuth } from "../components/Context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user === null) {
            navigate("/Home", { replace: true });
        }
    }, [user, navigate]);

    const [userDetails, setUserDetails] = useState(null);
    const [watched, setWatched] = useState(0);

    useEffect(() => {
        if (user && user.id) {
            fetch(`/api/users/${user.id}/details`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUserDetails(data.data);
                        setWatched(data.data.watched);
                    }
                })
                .catch((err) => console.error("Failed to fetch user details:", err));
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Prepare recent watches from history
    const recentWatches = userDetails?.history?.slice(0, 3).map(item => ({
        title: item.movieId.title,
        season: "", // You might need to adjust this based on your actual data
        episode: "", // You might need to adjust this based on your actual data
        image: item.movieId.poster,
        timestamp: item.timestamp
    })) || [];

    // Prepare favorites (example: top 3 most watched tags or something similar)
    // This is a simplified version - you might want to implement a better algorithm
    const favorites = userDetails?.history?.slice(0, 3).map(item => ({
        title: item.movieId.title,
        image: item.movieId.poster
    })) || [];

    // Calculate watch hours for the chart
    const watchHoursData = userDetails?.watchHours?.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        hours: item.duration / 60 // Convert minutes to hours
    })) || [];

    // Calculate genre distribution for analytics
    const genreData = {};
    userDetails?.history?.forEach(item => {
        item.movieTags.forEach(tag => {
            genreData[tag.tagName] = (genreData[tag.tagName] || 0) + 1;
        });
    });

    const mostWatchedGenre = Object.keys(genreData).reduce((a, b) => 
        genreData[a] > genreData[b] ? a : b, "None");

    return (
        <div className="bg-[#0B0B1E] text-white min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 py-12">
                <div
                    className="relative bg-cover bg-center h-[200px] rounded-xl overflow-hidden mb-16"
                    style={{ backgroundImage: `url(${profilebanner})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center px-10">
                        <div className="flex items-center w-full">
                            <img src={profile} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white" />
                            <div className="ml-6 flex-1">
                                <p className="text-gray-300 text-lg">Profile of</p>
                                <h2 className="text-3xl font-bold">{userDetails?.username || user?.username || 'username'}</h2>
                                <p className="text-sm mt-1">{watched} watched</p>
                                {userDetails?.subId && (
                                    <p className="text-sm mt-1">Subscription: {userDetails.subId.title}</p>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-[#6358D3] hover:bg-[#8883bb] text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Recent Watch</h3>
                        <div className="space-y-4">
                            {recentWatches.map((item, index) => (
                                <WatchItem key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">Favorites</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {favorites.map((item, index) => (
                                <FavoriteItem key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h3 className="text-2xl font-bold mb-6">Personal Overview</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-[#1E1E2A] p-4 rounded-lg">
                            <h4 className="mb-2 font-semibold">Watch Hours</h4>
                            <WatchHoursChart data={watchHoursData} />
                            <p className="text-sm text-gray-400 mt-2">
                                Total Watch Hours: {userDetails?.watchHours?.reduce((sum, item) => sum + item.duration, 0) / 60} hours
                            </p>
                        </div>
                        <div className="bg-[#1E1E2A] p-4 rounded-lg">
                            <h4 className="mb-2 font-semibold">Movie Analytics</h4>
                            <MovieAnalyticsChart data={Object.entries(genreData)} />
                            <p className="text-sm text-gray-400 mt-2">Most Watched Genre: {mostWatchedGenre}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-black bg-opacity-40 p-6 rounded-lg mb-10 text-center">
                    <h4 className="text-xl font-bold mb-4">Compatible Device</h4>
                    <div className="flex justify-center gap-12 text-gray-300">
                        <div className="flex flex-col items-center">
                            <img src={computerIcon} alt="Computer Icon" className="w-12 h-12 mb-2" />
                            <p className="font-semibold text-white">Computer</p>
                            <p>MacOS, Windows PC</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={phoneIcon} alt="Phone Icon" className="w-12 h-12 mb-2" />
                            <p className="font-semibold text-white">Mobile & Tablet</p>
                            <p>Android Phone & Tablet</p>
                            <p>Iphone & Ipad</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function WatchItem({ title, season, episode, image, timestamp }) {
    return (
        <div className="flex items-center bg-[#1E1E2A] p-3 rounded-lg">
            <img src={image} alt={title} className="w-[100px] h-[60px] object-cover rounded mr-4" />
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-400">
                    {season && `${season} · `}{episode && `${episode} · `}
                    Watched on {new Date(timestamp).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

function FavoriteItem({ title, image }) {
    return (
        <div className="relative">
            <img src={image} alt={title} className="w-full h-[185px] object-cover rounded-lg" />
            <p className="absolute bottom-2 left-2 text-sm bg-black bg-opacity-50 px-2 py-1 rounded">{title}</p>
        </div>
    );
}

export default ProfilePage;