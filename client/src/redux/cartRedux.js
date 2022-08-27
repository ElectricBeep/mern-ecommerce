import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id),
                1
            );
            // state.total += action.payload.price * action.payload.quantity;
        }
    }
});

export const { addProduct, clearCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;