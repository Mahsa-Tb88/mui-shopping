import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsCount() {
    return this.items.length;
  },
  hasItem(id) {
    return Boolean(this.items.find((item) => item._id == id));
  },
  getItemCount(id) {
    const item = this.items.find((item) => item._id == id);
    return item ? item.count : 0;
  },
  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].price * this.items[i].count;
    }
    return total;
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      localStorage.cartItems = JSON.stringify(state.items);
    },
    incrementItem(state, action) {
      if (state.hasItem(action.payload._id)) {
        state.items = state.items.map((p) => {
          if (p._id === action.payload._id) {
            return { ...p, count: p.count + 1 };
          } else {
            return p;
          }
        });
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      localStorage.cartItems = JSON.stringify(state.items);
    },
    decrementItem(state, action) {
      if (state.getItemCount(action.payload._id) > 1) {
        state.items = state.items.map((p) => {
          if (p._id === action.payload._id) {
            return { ...p, count: p.count - 1 };
          } else {
            return p;
          }
        });
      } else {
        state.items = state.items.filter((p) => p._id !== action.payload._id);
      }
      localStorage.cartItems = JSON.stringify(state.items);
    },
    deleteItem(state, action) {
      state.items = state.items.filter((p) => p._id !== action.payload._id);
      localStorage.cartItems = JSON.stringify(state.items);
    },
  },
});

export default cartSlice;
const cartActions = cartSlice.actions;
export { cartActions };
