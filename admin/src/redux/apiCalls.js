import { addProductsFailure, addProductsStart, addProductsSuccess, deleteProductsFailure, deleteProductsStart, deleteProductsSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductsFailure, updateProductsStart, updateProductsSuccess } from "./productRedux";
import { publicRequest, userRequest } from "./requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./authRedux";
import { addUserFailure, addUserStart, addUserSuccess, deleteUsersFailure, deleteUsersStart, deleteUsersSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrdersFailure, getOrdersStart, getOrdersSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./orderRedux";

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

//GET ALL PRODUCTS
export const getAllProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("products");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};

//DELETE PRODUCT
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductsStart());
    try {
        await userRequest.delete(`products/${id}`);
        dispatch(deleteProductsSuccess(id));
    } catch (err) {
        dispatch(deleteProductsFailure());
    }
};

//UPDATE PRODUCT
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductsStart());
    try {
        await userRequest.put(`products/${id}`, product);
        dispatch(updateProductsSuccess({ id: id, product: product }));
    } catch (err) {
        dispatch(updateProductsFailure());
    }
};

//ADD PRODUCT
export const addProduct = async (dispatch, product) => {
    dispatch(addProductsStart());
    try {
        const res = await userRequest.post("products", product);
        dispatch(addProductsSuccess(res.data));
    } catch (err) {
        dispatch(addProductsFailure());
    }
};

//GET ALL USERS
export const getAllUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await userRequest.get("users");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

//DELETE USER
export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUsersStart());
    try {
        await userRequest.delete(`users/${id}`);
        dispatch(deleteUsersSuccess(id));
    } catch (err) {
        dispatch(deleteUsersFailure());
    }
};

//UPDATE USER
export const updateUser = async (dispatch, id, user) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`users/${id}`, user);
        dispatch(updateUserSuccess({ id: id, user: user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

//ADD USER
export const addUser = async (dispatch, user) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post("auth/register", user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
};

//GET ALL ORDERS
export const getAllOrders = async (dispatch) => {
    dispatch(getOrdersStart());
    try {
        const res = await userRequest.get("orders");
        dispatch(getOrdersSuccess(res.data));
    } catch (err) {
        dispatch(getOrdersFailure());
    }
};

//DELETE ORDER
export const deleteOrder = async (dispatch, id) => {
    dispatch(deleteOrderStart());
    try {
        await userRequest.delete(`orders/${id}`);
        dispatch(deleteOrderSuccess(id));
    } catch (err) {
        dispatch(deleteOrderFailure());
    }
};

//UPDATE ORDER
export const updateOrder = async (dispatch, id, order) => {
    dispatch(updateOrderStart());
    try {
        await userRequest.put(`orders/${id}`, order);
        dispatch(updateOrderSuccess({ id: id, order: order }));
    } catch (err) {
        dispatch(updateOrderFailure());
    }
};