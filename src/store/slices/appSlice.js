import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  initialized: false,
  isMobile: false,
  categories: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.theme = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export default appSlice;
const appActions = appSlice.actions;
export { appActions };
