import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import PlayBanner from "../components/VideoInfoPage/PlayBanner";
import VideoTitleInfo from "../components/VideoInfoPage/VideoTitleInfo";
import DescriptionSection from "../components/VideoInfoPage/DescriptionSection";
import CastSection from "../components/VideoInfoPage/CastSection";
import RelatedMovies from "../components/VideoInfoPage/RelatedMovies";
import Footer from "../components/Footer";

function VideoInfoPage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [castMembers, setCastMembers] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success) {
          // Transform API data to match your component's structure
          const transformedMovieData = {
            title: data.data.title.toUpperCase(),
            year: data.data.year.toString(),
            rating: data.data.rating.toFixed(1),
            genres: data.data.tags.map(tag => tag.name),
            description: data.data.description,
            quote: data.data.quote,
            image: data.data.imgHeader,
            imgSubheader: data.data.imgSubheader
          };
          
          const transformedCast = data.data.cast.map(cast => ({
            image: cast.castPicture,
            name: cast.actorName,
            role: cast.roleName
          }));
          
          setMovieData(transformedMovieData);
          setCastMembers(transformedCast);
          
          // For related movies, you might want to fetch from another endpoint
          // For now, we'll just set an empty array
          setRelatedMovies([]);
        } else {
          throw new Error("Failed to fetch movie data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">Error: {error}</div>;
  }

  if (!movieData) {
    return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">No movie data found</div>;
  }

  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
      <Navbar />
      <PlayBanner poster={movieData.imgSubheader} />
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