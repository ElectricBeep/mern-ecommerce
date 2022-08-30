import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";

//LOGIN
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

//REGISTER
export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("auth/register", user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};

//UPDATE USER
export const updateUser = async (dispatch, userId, user) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`users/${userId}`, user);
        dispatch(updateUserSuccess({ userId: userId, user: user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};