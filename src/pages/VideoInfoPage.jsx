import Navbar from "../components/HomePage/Navbar";
import PlayBanner from "../components/VideoInfoPage/PlayBanner";
import VideoTitleInfo from "../components/VideoInfoPage/VideoTitleInfo";
import DescriptionSection from "../components/VideoInfoPage/DescriptionSection";
import CastSection from "../components/VideoInfoPage/CastSection";
import RelatedMovies from "../components/VideoInfoPage/RelatedMovies";
import Footer from "../components/Footer";


import beautyAndTheBeast from '/src/assets/BeautyAndTheBeast.jpeg';

import beautyAndTheBeast2 from '/src/assets/BeautyAndTheBeast2.png';


import EmmaWatson from '/src/assets/MovieCasts/Emma Watson.png';
import DanStevens from '/src/assets/MovieCasts/Dan Stevens.png';
import LukeEvans from '/src/assets/MovieCasts/Luke Evans.png';
import EwanMcGregor from '/src/assets/MovieCasts/Ewan McGregor.png';
import EmmaThomson from '/src/assets/MovieCasts/Emma Thompson.png';


import Aladin from '/src/assets/MoviePostersLandscape/Aladin.jpeg';
import LionKing from '/src/assets/MoviePostersLandscape/Lion King.png';
import SnowWhite from '/src/assets/MoviePostersLandscape/SnowWhite.png';

import { useParams } from "react-router-dom";

function VideoInfoPage() {
  const movieData = {
    title: "BEAUTY AND THE BEAST",
    year: "2020",
    rating: "7.9",
    genres: ["Romance", "Fantasy", "Disney"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    quote: `“Come and\nsee the\nmagic\nbestowed.”`,
    image: beautyAndTheBeast,
  };

  const castMembers = [
    { image: EmmaWatson, name: "Emma Watson", role: "Belle" },
    { image: DanStevens, name: "Dan Stevens", role: "Beast" },
    { image: LukeEvans, name: "Luke Evans", role: "Gaston" },
    { image: EwanMcGregor, name: "Ewan McGregor", role: "Lumiere" },
    { image: EmmaThomson, name: "Emma Thomson", role: "Mrs. Potts" },
  ];

  const relatedMovies = [
    { image: SnowWhite, title: "SNOW WHITE" },
    { image: Aladin, title: "ALADIN" },
    { image: LionKing, title: "LION KING" },
  ];
  const { id } = useParams();
  

  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
      <Navbar />
      <PlayBanner poster={beautyAndTheBeast2} />
      <VideoTitleInfo {...movieData} />
      <DescriptionSection
        description={movieData.description}
        quote={movieData.quote}
      />
      <CastSection cast={castMembers} />
      <RelatedMovies movies={relatedMovies} />
      <Footer />
    </div>
  );
}

export default VideoInfoPage;
