import React, { useState, useEffect } from "react";
import {Link, Route, Routes} from "react-router-dom";
import axios from "axios";
import Album from "../album-details/AlbumDetails";
import "./listStyle.css"

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
        <div className={"list-container"}>
            <h1>Artists</h1>
            {artists.map((artist) => (
                <a key={artist.id}>
                    <h2>{artist.name}</h2>
                    {artist.albums.map((album) => (
                        <a key={album.id}>
                            {<Album albumId={album.id}/>}
                            <br/>
                            {/*<img
                                className="album-image"
                                src={`http://localhost:8080/download/album_cover/${album.id}`}
                                alt={album.name}
                                width={"200px"}
                                height={"200px"}
                                hspace={2}
                            />*/}
                        </a>

                    ))}
                </a>
            ))}
        </div>
    );
};

export default ListOfArtist;
