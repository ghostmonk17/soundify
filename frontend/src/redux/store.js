import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import songReducer from "./slices/songSlice.js";
import uiReducer from "./slices/uiSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
    ui: uiReducer,
  },
});

export default store;
