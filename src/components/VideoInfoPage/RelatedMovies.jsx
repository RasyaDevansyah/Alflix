import MovieCardLandscape from "./MovieCardLandscape";

export default function RelatedMovies({ movies }) {
  return (
    <div className="pb-22 px-6 md:px-12 lg:px-24">
      <p className="text-xl font-bold mb-3 tracking-[0.15em]">More Like This:</p>
      <div className="flex gap-6 md:gap-10 overflow-x-auto py-2 custom-scrollbar">
        {movies.map((movie, index) => (
          <MovieCardLandscape
            key={index}
            imageSrc={movie.imgHeader}
            movieTitle={movie.title}
            id={movie._id}
          />
        ))}
      </div>
    </div>
  );
}
