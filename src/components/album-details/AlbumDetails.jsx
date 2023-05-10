import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./albumStyle.css"
import AudioPlayer from "../player/player";

const Album = ({ albumId }) => {
    const [album, setAlbum] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/album/${albumId}`
                );
                setAlbum(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAlbum();
    }, [albumId]);

    const handlePlay = (trackId) => {
        setIsPlaying(true);
        setCurrentTrack(trackId);
    };

    return (
        <div className="album-container">
            {album && (
                <>
                    <div className="main-info">
                        <img
                            className="album-image"
                            src={`http://localhost:8080/download/album_cover/${album.id}`}
                            alt={album.name}
                            width={"200px"}
                            height={"200px"}
                        />
                        <div className="main-info-data">
                            <h2 className="album-title">{album.title}</h2>
                            <p className="album-year">{album.releaseYear} {album.genre}</p>
                        </div>
                    </div>
                    <div className="album-details">
                        <div className="album-tracklist">
                            {album.songs.map((track) => (
                                <ul className="songs" key={track.id}>
                                    {/*<button
                                        className="play-button"
                                        onClick={() => handlePlay(track.id)}
                                    >
                                        {isPlaying && currentTrack === track.id ? "Pause" : "Play"}
                                    </button>
                                    <div className="track-details">
                                        <p className="track-name">{track.title}</p>
                                        <p className="track-duration">{track.duration}</p>
                                    </div>*/}

                                    <li>
                                        <a>{track.title}</a><span>{track.duration}</span>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    {isPlaying && (
                        <AudioPlayer
                            url={`http://localhost:8080/download/song/${currentTrack}`}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Album;
