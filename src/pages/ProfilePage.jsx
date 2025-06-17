import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/Footer";
import WatchHoursChart from "../components/WatchHoursChart";
import MovieAnalyticsChart from "../components/MovieAnalyticsChart";
import { FaSignOutAlt, FaBell, FaUser } from "react-icons/fa";

import phoneIcon from '/src/assets/Phone.png';
import computerIcon from '/src/assets/Computer.png';

import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    const recentWatches = userDetails?.history?.map(item => ({
        id: item.movieId._id,
        title: item.movieId.title,
        image: item.movieId.imgHeader,
        timestamp: item.timestamp
    })) || [];

    recentWatches.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const favorites = userDetails?.favorites?.map(item => ({
        id: item.movieId._id,
        title: item.movieId.title,
        image: item.movieId.imgHeader
    })) || [];

    const watchHoursData = userDetails?.watchHours?.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        hours: item.duration / 60
    })) || [];

    const genreData = {};
    userDetails?.history?.forEach(item => {
        item.movieTags.forEach(tag => {
            genreData[tag.tagName] = (genreData[tag.tagName] || 0) + 1;
        });
    });

    const genreChartData = Object.entries(genreData).map(([genre, count]) => ({
        genre,
        count
    }));

    genreChartData.sort((a, b) => b.count - a.count);
    const topGenreData = genreChartData.slice(0, 5);
    const mostWatchedGenre = genreChartData.length > 0 ? genreChartData[0].genre : "None";

    return (
        <div className="bg-[#0B0B1E] text-white min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12">

                <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-[#0B0B1E] p-6 rounded-xl shadow-md mb-10">
                    <div className="flex items-center gap-5">
                        <div className="bg-white rounded-full p-4">
                            <FaUser className="text-[#0B0B1E] text-3xl" />
                        </div>

                        <div>
                            <p className="text-white text-sm">Profile of</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] uppercase tracking-wide">
                                {userDetails?.username || user?.username || 'Username'}
                            </h2>
                            <p className="text-sm text-gray-400">{watched} watched</p>
                            {userDetails?.subId && (
                                <p className="text-sm text-gray-400">Subscription: {userDetails.subId.title}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 sm:mt-0 bg-[#6358D3] hover:bg-[#8883bb] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <div className="hidden lg:flex lg:flex-wrap lg:gap-2 lg:justify-evenly lg:items-center lg:mb-4 ">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Recent Watch</h3>
                            <hr className="flex-grow mx-4 hidden md:block border-t border-gray-600" />
                            <Link
                                to="/History"
                                className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm sm:text-base h-9 sm:h-10 flex items-center"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="lg:hidden flex flex-wrap gap-2 justify-evenly items-center mb-4 ">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Recent Watch</h3>
                            <hr className="flex-grow mx-4 md:block border-t border-gray-600" />
                            <Link
                                to="/History"
                                className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm sm:text-base h-9 sm:h-10 flex items-center"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentWatches.slice(0, 4).map((item, index) => (
                                <WatchItem key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Favorites</h3>
                        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar scrollbar-vertical"
                             style={{ overflowX: 'hidden' }}>
                            {favorites.map((item, index) => (
                                <FavoriteItem key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6">Personal Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1E1E2A] p-4 rounded-lg">
                            <h4 className="mb-2 font-semibold">Watch Hours</h4>
                            <WatchHoursChart data={watchHoursData} />
                            <p className="text-sm text-gray-400 mt-2">
                                Total Watch Hours: {userDetails?.watchHours?.reduce((sum, item) => sum + item.duration, 0) / 60} hours
                            </p>
                        </div>
                        <div className="bg-[#1E1E2A] p-4 rounded-lg">
                            <h4 className="mb-2 font-semibold">Movie Analytics</h4>
                            <MovieAnalyticsChart data={topGenreData} />
                            <p className="text-sm text-gray-400 mt-2">Most Watched Genre: {mostWatchedGenre}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-black bg-opacity-40 p-6 rounded-lg mb-10 text-center">
                    <h4 className="text-xl font-bold mb-4">Compatible Device</h4>
                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-gray-300">
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

function WatchItem({ id, title, season, episode, image, timestamp }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/VideoInfoPage/${id}`);
    };

    return (
        <div
            className="flex items-center bg-[#1E1E2A] p-3 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            <img src={image} alt={title} className="w-[100px] h-[60px] md:w-[120px] md:h-[70px] object-cover rounded mr-4" />
            <div>
                <p className="font-semibold text-sm sm:text-base">{title}</p>
                <p className="text-xs text-gray-400">
                    {season && `${season} · `}{episode && `${episode} · `}
                    Watched on {new Date(timestamp).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

function FavoriteItem({ title, image, id }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/VideoInfoPage/${id}`);
    };

    return (
        <div
        className="relative cursor-pointer hover:scale-105 transition-transform"
        onClick={handleClick}
        role="button">
            <img src={image} alt={title} className="w-full h-[185px] object-cover rounded-lg" />
            <p className="absolute bottom-2 left-2 text-xs sm:text-sm bg-black bg-opacity-50 px-2 py-1 rounded">{title}</p>
        </div>
    );
}

export default ProfilePage;
