export default function VideoTitleInfo({
  image,
  title,
  year,
  rating,
  genres,
  isFavorite,
  onToggleFavorite
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8 px-6 md:px-12 lg:px-24">
      {/* Poster */}
      <div className="w-full lg:w-1/2">
        <div className="relative overflow-hidden rounded-lg h-72 md:h-96 lg:h-[28rem] w-full shadow-[0_0_35px_15px_rgba(255,255,255,0.2)]">
          <img src={image} alt={title} className="absolute w-full h-full object-cover" />
        </div>
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-[0.15em] leading-[1.2]">{title}</h1>
            <button
              onClick={onToggleFavorite}
              className="text-red-500 text-3xl md:text-4xl hover:scale-110 transition"
              title={isFavorite ? "Unfavorite" : "Add to favorites"}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <h4 className="text-lg md:text-xl font-bold tracking-[0.15em] mb-4">
            {year} | {rating} ★
          </h4>

          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((genre, index) => (
              <p key={index} className="bg-[#333] px-3 py-1 rounded-full text-sm">{genre}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
