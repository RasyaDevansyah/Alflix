import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import PlayBanner from "../components/VideoInfoPage/PlayBanner";
import VideoTitleInfo from "../components/VideoInfoPage/VideoTitleInfo";
import DescriptionSection from "../components/VideoInfoPage/DescriptionSection";
import CastSection from "../components/VideoInfoPage/CastSection";
import RelatedMovies from "../components/VideoInfoPage/RelatedMovies";
import Footer from "../components/Footer";
import { useAuth } from "../components/Context/AuthContext";

function VideoInfoPage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [castMembers, setCastMembers] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    // Check if movie is in favorites when user or movie changes
    if (user && movieData) {
      checkIfFavorite();
    }
  }, [user, movieData]);

  const checkIfFavorite = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/favorites`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch favorites');
      
      const data = await response.json();
      console.log(data)
      if (data.success) {
        const isFav = data.data.favorites.some(fav => String(fav.movieId) === String(id));
        setIsFavorite(isFav);
      }
    } catch (err) {
      console.error("Error checking favorites:", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) return; // Don't proceed if not logged in
    console.log(user)
    setFavoriteLoading(true);
    try {
      const action = isFavorite ? "remove" : "add";
      const response = await fetch(`/api/users/${user.id}/favorites`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: id,
          action: action
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.success) {
        setIsFavorite(!isFavorite);
      } else {
        throw new Error(data.message || "Failed to update favorites");
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
      // Optionally show error to user
    } finally {
      setFavoriteLoading(false);
    }
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
            tags: data.data.tags
          };

          const transformedCast = data.data.cast.map(cast => ({
            image: cast.castPicture,
            name: cast.actorName,
            role: cast.roleName
          }));

          setMovieData(transformedMovieData);
          setCastMembers(transformedCast);

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
        const tagWeights = {};
        tags.forEach(tag => {
          tagWeights[tag.id] = 1;
        });

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
        isloggedIn={user !== null}
        isLoading={favoriteLoading}
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