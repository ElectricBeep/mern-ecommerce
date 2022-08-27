import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isFetching: false,
        error: false
    }, reducers: {
        //GET ALL
        getOrdersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrdersSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload;
        },
        getOrdersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE ORDER
        deleteOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders.splice(
                state.orders.findIndex((item) => item._id === action.payload),
                1
            )
        },
        deleteOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //GET ORDER
        updateOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders[
                state.orders.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.order;
        },
        updateOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure
} = orderSlice.actions;
export default orderSlice.reducer;