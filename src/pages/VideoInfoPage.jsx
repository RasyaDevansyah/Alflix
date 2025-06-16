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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success) {
          const transformedMovieData = {
            title: data.data.title.toUpperCase(),
            year: data.data.year.toString(),
            rating: data.data.rating.toFixed(1),
            genres: data.data.tags.map(tag => tag.name),
            description: data.data.description,
            quote: data.data.quote,
            image: data.data.imgHeader,
            imgSubheader: data.data.imgSubheader,
            tags: data.data.tags // Keep the tags for related movies
          };

          const transformedCast = data.data.cast.map(cast => ({
            image: cast.castPicture,
            name: cast.actorName,
            role: cast.roleName
          }));

          setMovieData(transformedMovieData);
          setCastMembers(transformedCast);

          // If we have tags, fetch related movies
          if (data.data.tags && data.data.tags.length > 0) {
            fetchRelatedMovies(data.data.tags);
          } else {
            setRelatedMovies([]);
          }
          
        } else {
          throw new Error("Failed to fetch movie data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedMovies = async (tags) => {
      try {
        // Create tag weights object (all weights equal to 1 initially)
        const tagWeights = {};
        tags.forEach(tag => {
          tagWeights[tag.id] = 1;
        });

        // Create comma-separated list of tag IDs
        const tagIds = tags.map(tag => tag.id).join(',');

        const response = await fetch(`/api/movies?tagId=${tagIds}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tagWeights)
        });

        if (!response.ok) {
          throw new Error(`Related movies fetch error! status: ${response.status}`);
        }

        const data = await response.json();
        
        
        if (data.success && Array.isArray(data.data)) {
          // Filter out the current movie from related movies
          const filtered = data.data.filter(movie => String(movie._id) !== String(id));
          setRelatedMovies(filtered.slice(0, 5));
        } else {
          setRelatedMovies([]);
        }
      } catch (err) {
        console.error("Error fetching related movies:", err);
        setRelatedMovies([]);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">Error: {error}</div>;
  if (!movieData) return <div className="min-h-screen bg-[#1e1e2a] text-white flex items-center justify-center">No movie data found</div>;

  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
      <Navbar />
      <PlayBanner poster={movieData.imgSubheader} />
      <VideoTitleInfo
        {...movieData}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <DescriptionSection description={movieData.description} quote={movieData.quote} />
      <CastSection cast={castMembers} />
      <RelatedMovies movies={relatedMovies} />
      <Footer />
    </div>
  );
}

export default VideoInfoPage;