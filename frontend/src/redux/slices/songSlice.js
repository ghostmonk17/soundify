import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],           // all songs
  currentSong: null,   // song currently playing / selected
  favourites: [],      // favourite songs
  isLoading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    // loading state for fetch/add/delete songs
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    // set all songs (after API call)
    setSongs: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // set currently selected / playing song
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },

    // add song (optional use-case)
    addSong: (state, action) => {
      state.songs.push(action.payload);
      state.isLoading = false;
    },

    // remove song by id
    removeSong: (state, action) => {
      state.songs = state.songs.filter(
        (song) => song._id !== action.payload
      );
    },

    // update favourites list
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },

    // error handling
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSongs,
  setCurrentSong,
  addSong,
  removeSong,
  setFavourites,
  setError,
  clearError,
} = songSlice.actions;

export default songSlice.reducer;
