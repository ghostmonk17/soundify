import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { updateFavourites } from "../../redux/slices/authSlice";
import { formatTime } from "../utils/helper";

import "../../css/footer/ControlArea.css";

const ControlArea = ({ playerState, playerControls }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const {
    isPlaying,
    currentTime,
    duration,
    currentSong,
    isLoading = false,
  } = playerState;

  const {
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleSeek,
  } = playerControls;

  const currentSongId = currentSong?.id;

  const favourites = Array.isArray(user?.favourites)
  ? user.favourites
  : [];

  const isLiked = Boolean(
    currentSongId &&
    favourites.some((fav) => fav.id === currentSongId)
  );


  const handleLike = async () => {
  if (!isAuthenticated || !currentSong) return;

  try {
    const songData = {
      id: currentSong.id,
      name: currentSong.name,
      artist_name: currentSong.artist_name,
      image: currentSong.image,
      duration: currentSong.duration,
      audio: currentSong.audio,
    };

    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/songs/favourite`,
         { song: songData },
         { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ IMPORTANT FIX
    dispatch(updateFavourites(res.data));
  } catch (error) {
    console.error("Like failed", error);
  }
};


  const safeDuration = duration || 0;
  const safeCurrentTime = Math.min(currentTime || 0, safeDuration);

  return (
    <div className="control-root">
      {/* PLAYBACK CONTROLS */}
      <div className="control-buttons">
        <button
          type="button"
          aria-label="previous"
          className="control-icon-btn"
          onClick={handlePrev}
        >
          <TbPlayerTrackPrevFilled color="#a855f7" size={24} />
        </button>

        <button
          type="button"
          aria-label="play"
          className="control-play-btn"
          onClick={handleTogglePlay}
          disabled={!currentSong}
        >
          {isLoading ? (
            <ImSpinner2 className="animate-spin" color="#a855f7" size={36} />
          ) : isPlaying ? (
            <GiPauseButton color="#a855f7" size={42} />
          ) : (
            <FaCirclePlay color="#a855f7" size={42} />
          )}
        </button>

        <button
          type="button"
          aria-label="next"
          className="control-icon-btn"
          onClick={handleNext}
        >
          <TbPlayerTrackNextFilled color="#a855f7" size={24} />
        </button>

        {isAuthenticated && (
          <button
            type="button"
            aria-label="like"
            className="control-icon-btn"
            onClick={handleLike}
            disabled={!currentSong}
          >
            {isLiked ? (
              <FaHeart color="#ff3c3c" size={22} />
            ) : (
              <FaRegHeart color="#a855f7" size={22} />
            )}
          </button>
        )}
      </div>

      {/* PROGRESS BAR */}
      <div className="control-progress-wrapper">
        <input
          type="range"
          min={0}
          max={safeDuration}
          value={safeCurrentTime}
          className="control-progress"
          onChange={(e) => handleSeek(Number(e.target.value))}
          disabled={!currentSong}
          style={{
            background: `linear-gradient(to right, #a855f7 ${
              safeDuration ? (safeCurrentTime / safeDuration) * 100 : 0
            }%, #333 ${
              safeDuration ? (safeCurrentTime / safeDuration) * 100 : 0
            }%)`,
          }}
        />

        <div className="control-times">
          <span>{formatTime(safeCurrentTime)}</span>
          <span>{formatTime(safeDuration)}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlArea;
