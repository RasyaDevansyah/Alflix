import { useNavigate } from 'react-router-dom';
import beautyAndTheBeast2 from '/src/assets/BeautyAndTheBeast2.png';

function PlayBanner() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/VideoPlayBack')}
      className="relative cursor-pointer"
    >
      <div className="max-h-[701px] overflow-hidden">
        <img
          src={beautyAndTheBeast2}
          alt="Beauty and the Beast"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold">
          <span className="text-2xl">▶</span>
          Play
        </button>
      </div>
    </div>
  );
}

export default PlayBanner;
