import { useState } from "react";
import AlflixLogo from "../AlflixLogo";
import { FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [isUserInSession, setUserInSession] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            setUserInSession(false);
        }
        else {
            setUserInSession(true);
        }
    }, [user, navigate]);


    return (
        <>
            {/* Navbar */}
            <div className="bg-[#1e1e2a] px-4 lg:px-8 py-3 flex items-center justify-between">
                {/* Desktop View (Logo & Menu) */}
                <div className="hidden lg:flex items-center gap-4">
                    <AlflixLogo type="2" className="w-1/5 h-auto" />
                    <Link
                        to="/Home"
                        className="text-white text-xl font-bold tracking-widest hover:text-purple-400"
                    >
                        HOME
                    </Link>
                    <Link
                        to="/BrowsePage"
                        className="text-white text-xl font-bold tracking-widest hover:text-purple-400"
                    >
                        BROWSE
                    </Link>
                    <Link
                        to="/Subscription"
                        className="text-white text-xl font-bold tracking-widest hover:text-purple-400"
                    >
                        SUBSCRIPTION
                    </Link>
                </div>

                {/* Desktop View (Profile) */}
                <div className="hidden lg:flex items-center gap-3">
                    {isUserInSession ? (
                        <>
                            <FaBell color="#DEDCFA" className="h-5 w-auto" />
                            <Link to="/Profile" className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-white flex items-center justify-center rounded-lg">
                                    <FaUser color="#1E1E2A" className="h-4 w-auto" />
                                </div>

                                <span className="text-lg text-[#6358D3] font-bold tracking-widest hover:text-purple-400">
                                    {user.username.toUpperCase()}
                                </span>
                            </Link>
                        </>
                    ) : (
                        <Link to="/SignIn" className="text-lg text-white font-bold tracking-widest hover:text-purple-400">
                            LOGIN
                        </Link>
                    )}
                </div>

                {/* Mobile View - Burger Icon */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu}>
                        <FaBars className="text-white h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <>
                    {/* Sidebar */}
                    <div className="fixed top-0 left-0 h-full w-2/3 sm:w-1/2 md:w-1/3 bg-[#1e1e2acc] backdrop-blur-sm z-40 p-5 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <AlflixLogo type="2" className="w-20 h-auto" />
                            <button onClick={toggleMenu}>
                                <FaTimes className="text-white h-5 w-5" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <Link
                                to="/Home"
                                onClick={toggleMenu}
                                className="text-sm text-white font-semibold tracking-wide hover:text-purple-400"
                            >
                                HOME
                            </Link>
                            <Link
                                to="/BrowsePage"
                                onClick={toggleMenu}
                                className="text-sm text-white font-semibold tracking-wide hover:text-purple-400"
                            >
                                BROWSE
                            </Link>
                            <Link
                                to="/Subscription"
                                onClick={toggleMenu}
                                className="text-sm text-white font-semibold tracking-wide hover:text-purple-400"
                            >
                                SUBSCRIPTION
                            </Link>

                            <hr className="my-3 border-gray-600" />

                            {isUserInSession ? (
                                <div className="flex items-center gap-3">
                                    <FaBell color="#DEDCFA" className="h-5 w-auto" />
                                    <Link to="/Profile" onClick={toggleMenu} className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-white flex items-center justify-center rounded-lg">
                                            <FaUser color="#1E1E2A" className="h-4 w-auto" />
                                        </div>
                                        <span className="text-sm text-[#6358D3] font-semibold tracking-wide hover:text-purple-400">
                                            {user.username.toUpperCase()}
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    to="/SignIn"
                                    onClick={toggleMenu}
                                    className="text-sm text-white font-semibold tracking-wide hover:text-purple-400"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </nav>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;