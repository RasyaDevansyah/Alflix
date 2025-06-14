import MovieCardLandscape from "./MovieCardLandscape";

export default function RelatedMovies({ movies }) {
  return (
    <div className="pb-22 px-6 md:px-12 lg:px-24">
      <p className="text-xl font-bold mb-3 tracking-[0.15em]">More Like This:</p>
      <div className="flex gap-6 md:gap-10 overflow-x-auto py-2 custom-scrollbar">
        {movies.map((movie, index) => (
          <MovieCardLandscape
            key={index}
            imageSrc={movie.image}
            movieTitle={movie.title}
          />
        ))}
        <div className="flex items-center justify-center h-48 w-20 md:w-30">
          <div className="flex flex-col items-center">
            <button className="bg-gray-600 text-white rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center hover:bg-gray-700 transition-colors text-3xl md:text-5xl font-bold">
              &gt;
            </button>
            <p className="font-bold text-sm md:text-xl mt-1">more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
