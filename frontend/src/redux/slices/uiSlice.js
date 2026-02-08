import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState:{
    authModalOpen:false,
    authMode:"login",
  },
  reducers: {
    // modal
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authMode= action.payload || "login";
    },

    closeAuthModal: (state,action) => {
      state.authModalOpen = false;
      state.authMode="login";
    },
    switchAuthModal: (state,action) => {
      state.authMode=action.payload;
    },

  },
});

export const {
  openAuthModal,
  closeAuthModal,
  switchAuthModal
} = uiSlice.actions;

export default uiSlice.reducer;
