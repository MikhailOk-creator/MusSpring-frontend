import React, { useState, useRef } from 'react';

const AudioPlayer = () => {
  const [audioUrl, setAudioUrl] = useState('http://localhost:8080/download/song/1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (timeInSeconds) => {
    const pad = (num, size) => (`000${num}`).slice(size * -1);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60);
    return `${pad(minutes, 1)}:${pad(seconds, 2)}`;
  };

  return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderTop: '1px solid #ddd'
        }}>
        <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
        />
        <div>
          <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
          <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
          />
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>
  );
};

export default AudioPlayer;
