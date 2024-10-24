import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  profile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.profile = {};
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
