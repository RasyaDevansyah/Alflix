import React from 'react';
import beautyVideo from '/src/assets/Video/BeautyAndTheBeast.MP4';

function VideoPlayBack() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <video className="w-full h-full object-contain" controls autoPlay>
        <source src={beautyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayBack;
