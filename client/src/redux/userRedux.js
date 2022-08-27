import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "login",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //LOGIN
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //LOGOUT
        logout: (state) => {
            state.currentUser = null;
        },
        //REGISTER
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateUserStart: (state) => {
            state.isFetching = true;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser[
                state.currentUser.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.user;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions;
export default userSlice.reducer;