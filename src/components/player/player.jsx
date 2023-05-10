import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";

const AudioPlayer = ({ songId }) => {
  const [audioUrl, setAudioUrl] = useState(`http://localhost:8080/download/song/${songId}`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const [songInfo ,setSongInfo] = useState(null);

  useEffect(() => {
     const fetchSong = async () => {
          try {
              const response = await axios.get(
                  `http://localhost:8080/song/${songId}`
              );
              setSongInfo(response.data);
          } catch (error) {
              console.log(error);
          }
      };
      fetchSong();
  }, [songId]);

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
              style={{width: '40%'}}
          />
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            <div>{songInfo.artist}</div>
            <div>{songInfo.title}</div>
        </div>
      </div>
  );
};

AudioPlayer.defaultProps = {
    songId: 1
};

export default AudioPlayer;
