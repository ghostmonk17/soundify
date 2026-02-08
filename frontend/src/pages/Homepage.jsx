import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";

import useAudioPlayer from "../hooks/useAudioPlayer.js";

import "../css/pages/HomePage.css";
import Modal from "../components/common/Modal.jsx";
import EditProfle from "../components/auth/EditProfile.jsx";



const Homepage = () => {
  const [view, setView] = useState("home");
  const [songs, setSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);
  const [openEditProfile, setOpenEditProfile]=useState(false);
   const auth = useSelector((state) => state.auth);

   const favourites = Array.isArray(auth.user?.favourites)
   ? auth.user.favourites
  : [];
  

  // Decide which list is active
  const songsToDisplay =
  view === "search"
    ? searchSongs
    : view === "favourite"
    ? favourites
    : songs;

  // Audio hook
  const {
    audioRef,
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,

    playSongIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleSeek,

    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,

    handleToggleMute,
    handleToggleLoop,
    handleToggleShuffle,
    handleChangeSpeed,
    handleChangeVolume,
  } = useAudioPlayer(songsToDisplay);

  const playerState = {
  currentSong,
  currentIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  loopEnabled,
  shuffleEnabled,
  playbackSpeed,
};

const playerControls = {
  playSongIndex,
  handleTogglePlay,
  handleNext,
  handlePrev,
  handleSeek,
};

const playerFeatures = {
  handleToggleMute,
  handleToggleLoop,
  handleToggleShuffle,
  handleChangeSpeed,
  handleChangeVolume,
};


  /* ---------------- FETCH INITIAL SONGS ---------------- */

  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs`
        );
        setSongs(res.data?.results || []);
      } catch (error) {
        console.error("Error fetching songs", error);
        setSongs([]);
      }
    };

    fetchInitialSongs();
  }, []);

  /* ---------------- PLAYLIST BY TAG ---------------- */

  const loadPlaylist = async (tag) => {
    if (!tag?.trim()) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${tag}`
      );

      const playlist = res.data?.results || [];
      setSongs(playlist);
      setView("home");

      if (playlist.length) {
        playSongIndex(0);
      }
    } catch (error) {
      console.error("Failed to load playlist", error);
      setSongs([]);
    }
  };

  /* ---------------- USER ACTIONS ---------------- */

  const handleSelectSong = (index) => {
    playSongIndex(index);
  };

  const handlePlayFavourite = (song) => {
  
    if (!favourites.length) return;

    const index = favourites.findIndex((fav) => fav.id === song.id);
    if (index === -1) return;

    setSongs(favourites);
    setView("favourite");

    requestAnimationFrame(() => {
      playSongIndex(index);
    });
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="homepage-root">
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        key={currentSong?.id}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        {currentSong && (
          <source src={currentSong.audio} type="audio/mpeg" />
        )}
      </audio>

      <div className="homepage-main-wrapper">
        {/* SIDEBAR */}
        <div className="homepage-sidebar">
          <SideMenu view={view} setView={setView} 
           onOpenEditProfile={()=> setOpenEditProfile(true)}/>
        </div>

        {/* MAIN CONTENT */}
        <div className="homepage-content">
          <MainArea
            view={view}
            currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            onSelectFavourite={handlePlayFavourite}
            onSelectTag={loadPlaylist}
            songsToDisplay={songsToDisplay}
            setSearchSongs={setSearchSongs}
          />
        </div>
      </div>

      {/* FOOTER PLAYER */}
      <Footer
       playerState={playerState}
       playerControls={playerControls}
      playerFeatures={playerFeatures}
      />

      {openEditProfile && (
        <Modal onClose={()=> setOpenEditProfile(false)}>
          <EditProfle onClose={()=> setOpenEditProfile(false)}/>
        </Modal>
      )}
    </div>
  );
};

export default Homepage;
