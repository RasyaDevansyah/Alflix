import MovieCardLandscape from "./MovieCardLandscape";

export default function RelatedMovies({ movies }) {
  return (
    <div className="pb-22 px-24">
      <p className="text-xl font-bold mb-3 tracking-[0.15em]">More Like This:</p>
      <div className="flex gap-10 overflow-x-clip py-2 custom-scrollbar">
        {movies.map((movie, index) => (
          <MovieCardLandscape
            key={index}
            imageSrc={movie.image}
            movieTitle={movie.title}
          />
        ))}
        {/* More Button */}
        <div className="flex items-center justify-center h-48 w-30">
          <div className="flex flex-col items-center">
            <button className="bg-gray-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-7xl font-bold">
              &gt;
            </button>
            <p className="font-bold text-xl">more</p>
          </div>
        </div>
      </div>
    </div>
  );
}