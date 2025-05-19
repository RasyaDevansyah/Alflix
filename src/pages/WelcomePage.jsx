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
        <div className="absolute inset-0 flex items-start justify-end p-7 w-full h-[10px] z-10">
          <Link to="/SignIn" className="bg-[#6358D3] text-white text-lg px-8 py-2 mx-10 rounded-2xl hover:bg-[#4f46a8] transition duration-200" 
          style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.3)' }}>
            Sign In
          </Link>
        </div>
        <img src={WelcomeBanner} alt="Welcome Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={Alflix} alt="Alflix Logo" className="w-auto h-1/4" />
          <h1 className="text-5xl font-bold text-center text-gray-400 mt-4">
            Your Own Personal Theatre
          </h1>
          <h2 className='text-2xl text-center text-gray-400 mt-2'>
            Welcome to Alflix
          </h2>
          <br></br>
          <Link to="/SignIn" className="bg-[#6358D3] text-white text-3xl px-8 py-4 mt-8 rounded-2xl hover:bg-[#4f46a8] transition duration-200"
          style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.3)' }}>
            Get Started
          </Link>
        </div>
      </div>

      <div className="block h-0.5 w-3/4 bg-[#6358D3] mx-auto my-[50px]"
      style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.8)' }}></div>

      <div className="flex justify-center gap-25 m-30">
        <div className="flex-1 max-w-sm h-[400px] flex flex-col gap-2 items-center justify-center 
        border-2 border-[#6358D3] rounded-lg p-8"
        style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}>
          <img src={WatchAnywhere} alt="Watch Anywhere" className="w-auto h-[150px] m-4" />
          <h2 className="text-2xl text-gray-400 font-bold text-center m-2">Watch Anywhere</h2>
          <p className="text-center text-gray-400">Experience our movie's, anytime, anywhere.</p>
        </div>
        <div className="flex-1 max-w-sm h-[400px] flex flex-col gap-2 items-center justify-center 
        border-2 border-[#6358D3] rounded-lg p-8"
        style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}>
          <img src={AccessAllMovies} alt="Access All Movies" className="w-[150px] h-auto m-4" />
          <h2 className="text-2xl text-gray-400 font-bold text-center m-2">Access All Movies</h2>
          <p className="text-center text-gray-400">Watch every movies you could ever imagine easily.</p>
        </div>
        <div className="flex-1 max-w-sm h-[400px] flex flex-col gap-2 items-center justify-center 
        border-2 border-[#6358D3] rounded-lg p-8"
        style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.3)' }}>
          <img src={AbsolutelyYours} alt="Absolutely Yours" className="w-auto h-[150px] m-4" />
          <h2 className="text-2xl text-gray-400 font-bold text-center m-2">Absolutely Yours</h2>
          <p className="text-center text-gray-400">Have your own personalize watching environment.</p>
        </div>
      </div>

      <div className="text-center my-10">
        <h2 className="text-6xl text-gray-400 font-bold m-10">10000+ Movies, Now Streaming.</h2>
        <p className="text-3xl text-gray-400 m-10">
          AlFlix is empowered by lots of Movies Power Houses, including:<br></br>Marvel, Disney, Pixar, DreamWorks, and more.
        </p>
        <div className="flex justify-center gap-20 items-center m-20">
          <img src={MARVEL} alt="MARVEL" className="h-[170px] w-auto" />
          <img src={Disney} alt="Disney" className="h-[170px] w-auto" />
          <img src={PIXAR} alt="PIXAR" className="h-[170px] w-auto" />
          <img src={DreamWorks} alt="DreamWorks" className="h-[170px] w-auto" />
        </div>
      </div>

      <div className="block h-0.5 w-3/4 bg-[#6358D3] mx-auto my-[50px]"
      style={{ boxShadow: '0 0 24px 0 rgba(255,255,255,0.8)' }}></div>

      <Footer />
    </div>
  );
}

export default WelcomePage;