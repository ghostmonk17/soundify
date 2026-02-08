import React from "react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";

import "../../css/footer/Feature.css";

const Features = ({ playerState, playerFeatures }) => {
  const {
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume = 0,
  } = playerState;

  const {
  handleToggleMute,
  handleToggleLoop,
  handleToggleShuffle,
  handleChangeSpeed,
  handleChangeVolume,
} = playerFeatures;

  const handleSpeedChange = (e) => {
    handleChangeSpeed(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    handleChangeVolume(Number(e.target.value) / 100);
  };

  return (
    <div className="features-root">
      <div className="features-row">
        {/* Mute */}
        <button
          className="features-btn"
          aria-label={isMuted ? "unmute" : "mute"}
          onClick={handleToggleMute}
        >
          {isMuted ? (
            <IoVolumeMuteOutline size={26} />
          ) : (
            <IoVolumeHighOutline size={26} className="active" />
          )}
        </button>

        {/* Shuffle */}
        <button
          className={`features-btn ${
            shuffleEnabled ? "features-btn-active" : ""
          }`}
          aria-label={shuffleEnabled ? "disable shuffle" : "enable shuffle"}
          onClick={handleToggleShuffle}
        >
          <TbArrowsShuffle size={26} />
        </button>

        {/* Loop */}
        <button
          className={`features-btn ${
            loopEnabled ? "features-btn-active" : ""
          }`}
          aria-label={loopEnabled ? "disable loop" : "enable loop"}
          onClick={handleToggleLoop}
        >
          <RiLoopRightLine size={26} />
        </button>

        {/* Playback Speed */}
        <label className="features-speed-label">
          <select
            className="features-speed-select"
            value={playbackSpeed}
            onChange={handleSpeedChange}
            aria-label="playback speed"
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>

      {/* Volume */}
      <div className="features-volume-wrapper">
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={handleVolumeChange}
          className="features-volume-range"
          style={{
            background: `linear-gradient(
              to right,
              #a855f7 ${volume * 100}%,
              #333 ${volume * 100}%
            )`,
          }}
          aria-label="volume"
        />
      </div>
    </div>
  );
};

export default Features;
