// Main page of musical streaming service
// Contains the main components of the application
// On this page, the user can listen to music (component: player), see the list of artists

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArtists } from '../../actions/index';
import ArtistList from '../artist-list/artist-list';
import Player from '../player/player';

class Main extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    }

    render() {
        return (
        <div className="main">
            <ArtistList />
            <Player />
        </div>
        );
    }
}