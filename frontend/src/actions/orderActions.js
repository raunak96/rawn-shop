import axios from "axios";
import orderActionTypes from "../actionTypes/orderActionTypes";
const {ORDER_CREATE_REQ,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,
	ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQ,
    ORDER_PAY_FAIL,ORDER_PAY_SUCCESS,ORDER_PAY_REQ,ORDER_PAY_RESET,
    ORDER_HISTORY_REQ,ORDER_HISTORY_SUCCESS,ORDER_HISTORY_FAIL,ORDER_LIST_FAIL,ORDER_LIST_SUCCESS,ORDER_LIST_REQ,ORDER_DELIVER_FAIL,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_REQ,ORDER_DELIVER_RESET
} = orderActionTypes;

export const createOrder = (order) => async (dispatch, getState)=>{
    try {
        dispatch({type: ORDER_CREATE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.post("/api/orders", order, config);
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}

export const getOrderById = (id) => async(dispatch, getState)=>{
    try {
        dispatch({type: ORDER_DETAILS_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.get(`/api/orders/${id}`, config);
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}

export const getOrderHistory = () => async(dispatch,getState)=>{
    try {
        dispatch({type: ORDER_HISTORY_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.get("/api/orders", config);
        dispatch({type: ORDER_HISTORY_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_HISTORY_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    } 
}
export const listOrders = () => async(dispatch,getState)=>{
    try {
        dispatch({type: ORDER_LIST_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.get("/api/orders/all", config);
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}

export const updatePaidStatus = (id, paymentResult) =>async(dispatch,getState)=>{
    try {
        dispatch({type: ORDER_PAY_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
        dispatch({type:ORDER_PAY_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}

export const updateDeliverStatus = (id) =>async(dispatch,getState)=>{
    try {
        dispatch({type: ORDER_DELIVER_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.put(`/api/orders/${id}/deliver`, {}, config);
        dispatch({type:ORDER_DELIVER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: ORDER_DELIVER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}

export const resetOrder =()=>dispatch=>{
    dispatch({type:ORDER_PAY_RESET});
    dispatch({type:ORDER_DELIVER_RESET});
};
