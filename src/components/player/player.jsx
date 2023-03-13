// Component to store the playlist add play them
import React, { useState, useEffect } from "react";

const AudioPlayer = ({ songId }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioUrl = `/download/song/${songId}`;
    const audioElement = new Audio(audioUrl);
    setAudio(audioElement);
  }, [songId]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioPlayer;
