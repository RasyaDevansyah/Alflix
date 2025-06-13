import { useNavigate } from 'react-router-dom';

function PlayBanner({ poster }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-h-[701px] overflow-hidden">
      <img
        src={poster}
        alt="Movie Poster"
        className="w-full object-cover max-h-[701px]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => navigate('/VideoPlayBack')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold shadow-lg"
        >
          <span className="text-2xl">▶</span> Play
        </button>
      </div>
    </div>
  );
}

export default PlayBanner;
