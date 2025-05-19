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
                <p className="mx-4 text-xl font-bold tracking-[0.15em]">BROWSE</p>
                <Link to="/Subscription" className="mx-4 text-xl font-bold tracking-[0.15em] hover:text-purple-400">
                    SUBSCRIPTION
                </Link>
            </div>

            {/* Navbar Right */}
            <div className="flex items-center gap-3">
                <FaBell color="#DEDCFA" className="h-5 w-auto" />
                <Link to="/Profile" className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white flex items-center justify-center rounded-lg">
                        <FaUser color="#1E1E2A" className="h-4 w-auto" />
                    </div>
                    <span className="mr-4 text-[#6358D3] font-bold tracking-[0.15em] hover:text-purple-400">
                        USERNAME
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
