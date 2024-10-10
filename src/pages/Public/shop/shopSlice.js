import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalProducts: 0,
  isLoading: "",
  category: "",
  page: 1,
  limit: 6,
  q: "",
  order: "dec",
  sort: "_id",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setTotalProducts(state, action) {
      state.totalProducts = action.payload;
    },
    setIsLoding(state, action) {
      state.isLoading = action.payload;
    },
    setFilter(state, action) {
      const payload = action.payload;
      state.page = payload.page;
      state.q = payload.q;
      state.category = payload.category;
      state.sort = payload.sort;
      state.order = payload.order;
      state.limit = payload.limit;
    },
  },
});

export default shopSlice;
const shopActions = shopSlice.actions;
export { shopActions };
