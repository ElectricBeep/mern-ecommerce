import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        clearWishlist: (state) => {
            state.products = [];
        },
        removeWishlistProduct: (state, action) => {
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id),
                1
            );
        }
    }
});

export const { addProduct, clearWishlist, removeWishlistProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;