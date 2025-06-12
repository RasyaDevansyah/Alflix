import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import dotenv from 'dotenv';

dotenv.config();

// TMDB Configuration
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";


// AWS S3 Client (v3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// MongoDB Models (unchanged)
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0.0, max: 10.0 },
  video: { type: String, required: true },
  imgHeader: { type: String, required: true },
  imgSubheader: { type: String, required: true },
  year: { type: Number, required: true },
  quote: { type: String, required: false },
  tags: [{
    id: { type: Number, required: true },
    name: { type: String, required: true }
  }],
  cast: [{
    castPicture: { type: String, required: true },
    actorName: { type: String, required: true },
    roleName: { type: String, required: true }
  }]
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

// Helper: Upload to S3 (v3)
const uploadToS3 = async (fileBuffer, fileName, contentType) => {
  if (!process.env.S3_BUCKET) {
    throw new Error("S3_BUCKET environment variable is missing");
  }

  const params = {
    Bucket: process.env.S3_BUCKET, // ← Now validated
    Key: `photos/${fileName}`,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read'
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/photos/${fileName}`;
  } catch (err) {
    console.error("S3 Upload Error:", err);
    return null;
  }
};

// Helper: Download and process images
const processImage = async (imagePath, prefix, movieId) => {
  if (!imagePath) return null;

  const ext = path.extname(imagePath);
  const fileName = `${prefix}-${movieId}${ext}`;
  const url = `${IMAGE_BASE}${imagePath}`;

  try {
    // 1. Download locally
    const localPath = path.join(process.cwd(), 'photos', fileName);
    await fs.mkdir(path.dirname(localPath), { recursive: true });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    await pipeline(
      response.body,
      createWriteStream(localPath)
    );

    // 2. Upload to S3
    const fileBuffer = await fs.readFile(localPath);
    const s3Url = await uploadToS3(
      fileBuffer,
      fileName,
      response.headers.get('content-type')
    );

    return s3Url;
  } catch (err) {
    console.error(`Image processing failed (${fileName}):`, err.message);
    return null;
  }
};

// Main movie processor
const processMovie = async (movie) => {
  try {
    const [details, credits, videos] = await Promise.all([
      fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`).then(res => res.json()),
      fetch(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}`).then(res => res.json()),
      fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`).then(res => res.json())
    ]);

    const trailer = videos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    if (!trailer) {
      console.log(`Skipping ${movie.title} - no trailer found`);
      return null;
    }

    // Process images in parallel
    const [posterUrl, backdropUrl, collectionBackdropUrl] = await Promise.all([
      processImage(movie.poster_path, 'poster', movie.id),
      processImage(movie.backdrop_path, 'backdrop', movie.id),
      processImage(details.belongs_to_collection?.backdrop_path, 'collection', movie.id)
    ]);

    if (!posterUrl || !backdropUrl || !collectionBackdropUrl) {
      console.log(`Skipping ${movie.title} - missing essential images`);
      return null;
    }

    // Prepare database document
    return {
      title: movie.title,
      poster: posterUrl,
      description: movie.overview,
      rating: movie.vote_average,
      video: `https://youtu.be/${trailer.key}`,
      imgHeader: backdropUrl,
      imgSubheader: collectionBackdropUrl || backdropUrl,
      year: new Date(movie.release_date).getFullYear(),
      quote: details.tagline || '',
      tags: details.genres?.map(g => ({ id: g.id, name: g.name })) || [],
      cast: credits.cast
        ?.filter(actor => actor.profile_path) // Keep profile picture requirement
        .slice(0, 15)
        .map(actor => ({
          actorName: actor.name,
          roleName: actor.character || 'Unknown Role', // Default value
          castPicture: `${IMAGE_BASE}${actor.profile_path}`
        })) || []
    };
  } catch (err) {
    console.error(`Failed to process ${movie.id}:`, err);
    return null;
  }
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully: " + conn.connection.host);

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}


// Execution
(async () => {
  connectDB();

  try {
    for (let page = 16; page <= 45; page++) {
      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`
      );
      const data = await res.json();

      for (const movie of data.results) {
        const movieData = await processMovie(movie);
        if (movieData) {
          await Movie.create(movieData);
          console.log(`Saved: ${movie.title}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit
        }
      }
    }
  } finally {
    await mongoose.disconnect();
  }
})();


// node --trace-warnings backend\config\populateDB.js