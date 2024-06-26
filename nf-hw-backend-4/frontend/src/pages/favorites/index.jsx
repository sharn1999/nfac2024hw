import Song from "../../components/song";
import Modal from "../../components/modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useService } from "../../context/Service";

const Favorites = () => {


    const [modalOpen, setModalOpen] = useState(false);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allPlaylists, setAllPlaylists] = useState([]);
    const [user, setUser] = useState(null);
    const [currentSongId, setCurrentSongId] = useState(null);

    const {getAllSongs, getPlaylists, artistId, getUserById, toggleFavorite, onPlaylistSelect} = useService();

    useEffect(() => {
        const fetchSongs = async () => {
            const songsData = await getAllSongs();
            setSongs(songsData);
          };
    
        fetchSongs();
    
      }, [getAllSongs]);

      const handleToggleFavorite = async (songsId) => {
        const response = await toggleFavorite(songsId)
        if(response){
          setUser(prev => ({ ...prev, favorites: response.data.favorites }));
        }
      }

    const handleAddToPlaylistClick = (songId) => {
        setModalOpen(true);
        setCurrentSongId(songId);
    };

    const handleOnPlaylistSelect = async (playlistId, songId) => {
      const response = await onPlaylistSelect(playlistId, songId);
      if (response.status === 200) {
        console.log('Song added to playlist successfully');
        setModalOpen(false);
      }
    }


    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            try {
                const playlists = await getPlaylists();
                setAllPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching playlist songs:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylistSongs();

        return () => {
            setLoading(false);
            setError(null);
        };
    }, [getPlaylists]);

    useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUserById(artistId);
        setUser(userData);
      };
  
      fetchUser();
  
    }, [getUserById]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading playlist: {error.message}</div>;

    return(
        <div className="min-h-screen text-gray-300">
        <div className="bg-custom-section md:pl-72 pt-32 p-8">
          <div className="bg-black min-h-screen p-8 text-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mt-10 mb-4">Favorites</h2>
              {songs && songs.length > 0 ? (
              <ul>
                {songs.map((song) => (
                  user && user.favorites.includes(song._id) ? <Song key={song._id} song={song} isOwner={null} handleDeleteClick={null} handleEditClick={null} handleAddToPlaylistClick={handleAddToPlaylistClick} toggleFavorite={handleToggleFavorite} favorites={user ? user.favorites : null} /> : null
                ))}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onPlaylistSelect={handleOnPlaylistSelect} songId={currentSongId}>
                    {allPlaylists} 
                </Modal>
              </ul>
            ) : (
              null
            )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Favorites;