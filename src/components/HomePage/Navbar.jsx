// import AlflixLogo from "./AlflixLogo";
import AlflixLogo from "../AlflixLogo";
import { FaBell, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="flex h-14 justify-between">
            {/* Navbar Left */}
            <div className="flex items-center">
                <AlflixLogo type='2' className="w-1/5 h-auto mr-4 ml-3" />
                <div className="h-9 w-px bg-white mx-4"></div>
                <Link to="/Home" className="mx-4 text-xl font-bold tracking-[0.15em] hover:text-purple-400">
                    HOME
                </Link>
                <Link to="/BrowsePage" className="mx-4 text-xl font-bold tracking-[0.15em] hover:text-purple-400">
                    BROWSE
                </Link>
                <Link to="/Subscription" className="mx-4 text-xl font-bold tracking-[0.15em] hover:text-purple-400">
                    SUBSCRIPTION
                </Link>
            </div>

            {/* Navbar Right */}
            <div className="flex items-center gap-3">
                <FaBell color="#DEDCFA" className="h-5 w-auto" />
                <div className="w-7 h-7 bg-white flex items-center justify-center rounded-lg">
                    <FaUser color="#1E1E2A" className="h-4 w-auto" />
                </div>
                <p className="mr-4 text-[#6358D3] font-bold tracking-[0.15em]">USERNAME</p>
            </div>
        </div>
    );
}

export default Navbar;