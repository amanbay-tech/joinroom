// YouTubePlayer.js
"use client";

import { useEffect, useRef } from "react";

const YouTubePlayer = ({ videoId }) => (
    <div className="video-container mx-auto mt-6">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          className="absolute top-0 left-0 w-full h-full rounded-md shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
  

export default YouTubePlayer;
