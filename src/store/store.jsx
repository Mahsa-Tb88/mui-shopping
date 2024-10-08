import { configureStore, createSlice } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import shopSlice from "../pages/Public/shop/shopSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    shop: shopSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
