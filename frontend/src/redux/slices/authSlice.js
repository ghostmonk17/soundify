import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loading state during API calls
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      // state.error = null;
    },

    // login / register / fetch user success
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    updateFavourites: (state, action) => {
      state.user.favourites = Array.isArray(action.payload)
       ? action.payload
      : [];
    },


    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setError,
  logout,
  clearError,
  updateFavourites,
} = authSlice.actions;

export default authSlice.reducer;
