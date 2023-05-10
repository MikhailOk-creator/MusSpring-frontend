import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Album from "../album-details/AlbumDetails";

const ListOfArtist = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            const result = await axios.get("http://localhost:8080/artist/all");
            setArtists(result.data);
        };
        fetchArtists();
    }, []);

    return (
        <div>
            <h1>Artists</h1>
            {artists.map((artist) => (
                <a key={artist.id}>
                    <h2>{artist.name}</h2>
                    {artist.albums.map((album) => (
                        <a key={album.id}>
                             <Album albumId={album.id} />
                        </a>
                    ))}
                </a>
            ))}
        </div>
    );
};

export default ListOfArtist;
