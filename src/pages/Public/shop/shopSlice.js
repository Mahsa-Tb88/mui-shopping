import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalProducts: 0,
    isLoading: false,
    page: 1,
    limit: 6,
    q: "",
    category: "",
    sort: "_id",
    order: "desc",
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
        setIsLoading(state, action) {
            state.isLoading = action.isLoading;
        },
        setFilters(state, action) {
            const payload = action.payload;
            state.page = payload.page;
            state.limit = payload.limit;
            state.category = payload.category;
            state.q = payload.q;
            state.sort = payload.sort;
            state.order = payload.order;
        },
    },
});

export default shopSlice;
const shopActions = shopSlice.actions;
export { shopActions };
