export default function VideoTitleInfo({ image, title, year, rating, genres }) {
    return (
      <div className="flex gap-18 py-8 px-24">
        {/* Left Side */}
        <div className="w-1/2 -mt-43 relative z-10">
          <div className="relative overflow-hidden rounded-lg h-110 w-165 shadow-[0_0_35px_15px_rgba(255,255,255,0.2)]">
            <img
              src={image}
              alt={title}
              className="absolute w-full h-full object-cover"
            />
          </div>
        </div>
  
        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-between">
          <h1 className="text-7xl font-bold mb-4 tracking-[0.15em] leading-[1.2]">{title}</h1>
          <div className="mb-4">
            <h4 className="text-xl font-bold tracking-[0.15em]">{year} | {rating} ★</h4>
          </div>
          <div className="flex gap-2 mb-4">
            {genres.map((genre, index) => (
              <p key={index} className="bg-[#333] px-3 py-1 rounded-full">{genre}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }