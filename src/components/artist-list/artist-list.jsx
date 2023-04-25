// Component that will be used to display the list of artists
// URL: /artist/all

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../../services/artistService";

const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const { data } = await getArtists();
        setArtists(data);
        };
        fetchData();
    }, []);

    return (
        <div>
        <h1>Artists</h1>
        <ul>
            {artists.map((artist) => (
            <li key={artist._id}>
                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
}