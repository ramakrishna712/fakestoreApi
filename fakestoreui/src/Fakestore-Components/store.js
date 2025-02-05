import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity = 1
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(item => item.id !== action.payload);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export default store;
