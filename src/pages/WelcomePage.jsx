import WelcomeBanner from '../assets/WelcomePage/WelcomeBanner.png';
import WatchAnywhere from '../assets/WelcomePage/WatchAnywhere.png';
import AccessAllMovies from '../assets/WelcomePage/AccessAllMovies.png';
import AbsolutelyYours from '../assets/WelcomePage/AbsolutelyYours.png';
import MARVEL from '../assets/WelcomePage/MARVEL.png';
import Disney from '../assets/WelcomePage/Disney.png';
import PIXAR from '../assets/WelcomePage/PIXAR.png';
import DreamWorks from '../assets/WelcomePage/DreamWorks.png';
import Alflix from '../assets/Alflix Logo.png';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin relative">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-start justify-end p-4 sm:p-7 w-full h-[10px] z-10">
          <Link
            to="/SignIn"
            className="bg-[#6358D3] text-white text-base sm:text-lg px-5 sm:px-8 py-2 mx-4 sm:mx-10 rounded-2xl hover:bg-[#4f46a8] transition duration-200"
            style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.3)' }}
          >
            Sign In
          </Link>
        </div>
        <img
          src={WelcomeBanner}
          alt="Welcome Banner"
          className="w-full h-[300px] sm:h-[400px] md:h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <img src={Alflix} alt="Alflix Logo" className="w-12 sm:w-20 md:w-25 lg:w-32 h-auto sm:h-auto md:h-auto" />
          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-center text-gray-400 mt-4">
            Your Own Personal Theatre
          </h1>
          <h2 className="text-lg sm:text-xl text-center text-gray-400 mt-2">
            Welcome to Alflix
          </h2>
          <br />
          <Link
            to="/SignIn"
            className="bg-[#6358D3] text-white text-lg sm:text-2xl md:text-3xl px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-8 rounded-2xl hover:bg-[#4f46a8] transition duration-200"
            style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.3)' }}
          >
            Get Started
          </Link>
        </div>
      </div>

      <div
        className="block h-0.5 w-11/12 sm:w-3/4 bg-[#6358D3] mx-auto my-8 sm:my-[50px]"
        style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.8)' }}
      ></div>

      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 lg:gap-25 m-4 md:m-10">
        <div
          className="flex-1 max-w-full md:max-w-sm h-[340px] sm:h-[400px] flex flex-col gap-2 items-center justify-center border-2 border-[#6358D3] rounded-lg p-6 sm:p-8 mb-6 md:mb-0"
          style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}
        >
          <img src={WatchAnywhere} alt="Watch Anywhere" className="w-24 sm:w-auto h-24 sm:h-[150px] m-4" />
          <h2 className="text-xl sm:text-2xl text-gray-400 font-bold text-center m-2">Watch Anywhere</h2>
          <p className="text-center text-gray-400 text-sm sm:text-base">Experience our movie's, anytime, anywhere.</p>
        </div>
        <div
          className="flex-1 max-w-full md:max-w-sm h-[340px] sm:h-[400px] flex flex-col gap-2 items-center justify-center border-2 border-[#6358D3] rounded-lg p-6 sm:p-8 mb-6 md:mb-0"
          style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}
        >
          <img src={AccessAllMovies} alt="Access All Movies" className="w-24 sm:w-[150px] h-24 sm:h-auto m-4" />
          <h2 className="text-xl sm:text-2xl text-gray-400 font-bold text-center m-2">Access All Movies</h2>
          <p className="text-center text-gray-400 text-sm sm:text-base">Watch every movies you could ever imagine easily.</p>
        </div>
        <div
          className="flex-1 max-w-full md:max-w-sm h-[340px] sm:h-[400px] flex flex-col gap-2 items-center justify-center border-2 border-[#6358D3] rounded-lg p-6 sm:p-8"
          style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}
        >
          <img src={AbsolutelyYours} alt="Absolutely Yours" className="w-24 sm:w-auto h-24 sm:h-[150px] m-4" />
          <h2 className="text-xl sm:text-2xl text-gray-400 font-bold text-center m-2">Absolutely Yours</h2>
          <p className="text-center text-gray-400 text-sm sm:text-base">Have your own personalize watching environment.</p>
        </div>
      </div>

      <div className="text-center my-8 sm:my-10 px-2">
        <h2 className="text-3xl sm:text-5xl md:text-6xl text-gray-400 font-bold m-4 sm:m-10">
          10000+ Movies, Now Streaming.
        </h2>
        <p className="text-lg sm:text-2xl md:text-3xl text-gray-400 m-4 sm:m-10">
          AlFlix is empowered by lots of Movies Power Houses, including:
          <br />
          Marvel, Disney, Pixar, DreamWorks, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-20 items-center m-6 sm:m-20">
          <img src={MARVEL} alt="MARVEL" className="h-16 sm:h-[120px] md:h-[170px] w-auto" />
          <img src={Disney} alt="Disney" className="h-16 sm:h-[120px] md:h-[170px] w-auto" />
          <img src={PIXAR} alt="PIXAR" className="h-16 sm:h-[120px] md:h-[170px] w-auto" />
          <img src={DreamWorks} alt="DreamWorks" className="h-16 sm:h-[120px] md:h-[170px] w-auto" />
        </div>
      </div>

      <div
        className="block h-0.5 w-11/12 sm:w-3/4 bg-[#6358D3] mx-auto my-8 sm:my-[50px]"
        style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.8)' }}
      ></div>

      <Footer />
    </div>
  );
}

export default WelcomePage;