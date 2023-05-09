import './App.css';
import AudioPlayer from "./components/player/player";
import ListOfArtist from "./components/artist-list/ListOfArtist";
import Album from "./components/album-details/AlbumDetails";

function App() {
  return (
    <div className="App">
        <ListOfArtist />
        <AudioPlayer />
    </div>
  );
}

export default App;
