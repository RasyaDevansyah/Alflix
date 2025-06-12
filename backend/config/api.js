import { writeFile } from 'fs/promises';

const API_KEY = "e19e4602718ce2c507c531e81f032139"
const BASE_URL = "https://api.themoviedb.org/3"

export const getDiscoveredMovies = async ({
    include_adult = false,
    include_video = false,
    language = "en-US",
    page = 1,
    sort_by = "popularity.desc"
} = {}) => {
    const url = `${BASE_URL}/discover/movie?include_adult=${include_adult}&include_video=${include_video}&language=${language}&page=${page}&sort_by=${encodeURIComponent(sort_by)}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
};

export const getMovieDetail = async (movieId, language = "en-US") => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const getMovieCredits = async (movieId, language = "en-US") => {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${language}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const filterActors = (credits) => {
    if (!credits || !Array.isArray(credits.cast)) return [];
    return credits.cast
        .filter(
            member =>
                member.known_for_department === "Acting" &&
                member.profile_path && member.profile_path !== null
        )
        .slice(0, 15);
};


//you can get image src from https://image.tmdb.org/t/p/original/{img path}


const movies = await getDiscoveredMovies();
await writeFile('backend/config/discoveredMovies.json', JSON.stringify(movies, null, 2), 'utf-8');
console.log('Movies saved to discoveredMovies.json');


const movieDetail = await getMovieDetail(11544);
await writeFile('backend/config/MovieDetail11544.json', JSON.stringify(movieDetail, null, 2), 'utf-8');
console.log('Movies saved to MovieDetail11544.json');

const movieCredits = await getMovieCredits(11544);
const filteredActors = filterActors(movieCredits);
await writeFile('backend/config/MovieCredits11544.json', JSON.stringify(filteredActors, null, 2), 'utf-8');
console.log('Filtered actors saved to MovieCredits11544.json');

