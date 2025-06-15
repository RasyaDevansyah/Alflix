import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/HomePage/Navbar";
import beautyVideo from "/src/assets/Video/BeautyAndTheBeast.mp4";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaClosedCaptioning, FaCog } from "react-icons/fa";

function VideoPlayBack() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="bg-[#0c1a43] text-white min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center px-4 pt-8">
        <div
          ref={containerRef}
          className="w-full max-w-6xl relative group aspect-video bg-black"
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={beautyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          
          <div className="absolute bottom-0 left-0 right-0 z-20">
           
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-transparent appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a855f7 ${
                  (currentTime / duration) * 100
                }%, #ffffff33 0%)`,
              }}
            />

            
            <div className="px-4 py-2 bg-black bg-opacity-60 flex justify-between items-center text-sm">
             
              <div className="flex items-center gap-4">
                <button onClick={togglePlay}>
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
                <FaVolumeUp />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
                <span className="font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              
              <div className="flex items-center gap-4">
                <span>1080p</span>
                <button className="bg-white text-black px-1 rounded text-xs font-bold">
                  CC
                </button>
                <FaCog size={18} />
                <button onClick={toggleFullScreen}>
                  <FaExpand size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayBack;
