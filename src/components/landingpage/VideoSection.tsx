"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface VideoItem {
  type: "youtube" | "mp4";
  src: string;
  id?: string;
}

const videos: VideoItem[] = [
  // --- YouTube Fashion Videos ---
  {
    type: "youtube",
    src: "https://www.youtube.com/watch?v=auUwKMujn-M",
    id: "auUwKMujn-M", // Zara fashion ad
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/watch?v=Yk96lKLiVeI",
    id: "Yk96lKLiVeI", // Vogue fashion highlights
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/watch?v=6KQQyg3I5IE",
    id: "6KQQyg3I5IE", // Zara fashion lookbook
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/watch?v=daY7ScH5VW8",
    id: "daY7ScH5VW8", // Paris Fashion Week highlights
  },

  // --- Local or hosted MP4 videos ---
  { type: "mp4", src: "/videos/classy.mp4" },
  { type: "mp4", src: "/videos/summer.mp4" },
];

const VideoSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative z-1 w-full mx-auto overflow-hidden h-[400px] md:h-[500px] rounded-2xl shadow-md bg-black">
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        {currentVideo.type === "youtube" ? (
          <YouTube
            videoId={getYoutubeId(currentVideo.src) || currentVideo.id}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            }}
            className="w-full h-full"
            iframeClassName="w-full h-full rounded-2xl object-contain"
          />
        ) : (
          <video
            controls
            className="w-full h-full object-contain rounded-2xl"
            playsInline
          >
            <source src={currentVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 text-black p-3 rounded-full cursor-pointer hover:bg-white transition z-10 pointer-events-auto"
      >
        <FaChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 cursor-pointer text-black p-3 rounded-full hover:bg-white transition z-10 pointer-events-auto"
      >
        <FaChevronRight size={22} />
      </button>
    </div>
  );
};

export default VideoSection;
