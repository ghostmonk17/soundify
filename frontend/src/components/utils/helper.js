export const formatTime = (sec) => {
  if (typeof sec !== "number" || isNaN(sec) || sec < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(sec);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};
