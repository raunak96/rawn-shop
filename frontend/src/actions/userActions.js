import axios from "axios";
import orderActionTypes from "../actionTypes/orderActionTypes";
import userActionTypes from "../actionTypes/userActionTypes";
const {USER_LOGIN_FAIL,USER_LOGIN_REQ,USER_LOGIN_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQ,USER_REGISTER_SUCCESS,USER_LOGOUT,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_REQ,USER_UPDATE_PROFILE_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQ,USER_DETAILS_SUCCESS,
USER_LIST_FAIL,USER_LIST_REQ,USER_LIST_SUCCESS,USER_DELETE_REQ,USER_DELETE_SUCCESS,USER_DELETE_FAIL,USER_UPDATE_FAIL,USER_UPDATE_SUCCESS,USER_UPDATE_REQ,USER_DETAILS_RESET} = userActionTypes;

export const login = (email,password)=> async (dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQ});
        const config = { headers : { "Content-Type" : "application/json" } };
        const {data} = await axios.post("/api/users/login", {email,password}, config );
        dispatch({type:USER_LOGIN_SUCCESS, payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));

    } catch (error) {
        dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const register = (email,name,password)=> async (dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQ});
        const config = { headers : { "Content-Type" : "application/json" } };
        const {data} = await axios.post("/api/users", {email,name,password}, config );
        dispatch({type:USER_REGISTER_SUCCESS, payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));

    } catch (error) {
        dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const getUserDetails = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({type: USER_DETAILS_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.get(`/api/users/${id}`,config);
        dispatch({type: USER_DETAILS_SUCCESS , payload: data});
        
    } catch (error) {
        if(error.response.status===401){
            dispatch(logout());
        }
        dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}
export const updateUserProfile = (user)=> async (dispatch,getState)=>{
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.put(`/api/users/profile`,user,config);
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS , payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        if (error.response.status === 401) {
			dispatch(logout());
		}
        dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const getUsers = ()=>async (dispatch,getState)=>{
    try {
        dispatch({type: USER_LIST_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.get("/api/users",config);
        dispatch({type: USER_LIST_SUCCESS, payload: data});

    } catch (error) {
        if (error.response.status === 401) {
			dispatch(logout());
		}
        dispatch({
			type: USER_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const deleteUser = (id)=> async(dispatch,getState)=>{
    try {
        dispatch({type: USER_DELETE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        await axios.delete(`/api/users/${id}`,config);
        dispatch({type: USER_DELETE_SUCCESS});
        dispatch(getUsers());
    } catch (error) {
        if (error.response.status === 401) {
			dispatch(logout());
		}
         dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const updateUser = (id,user) => async (dispatch,getState)=>{
    try {
        dispatch({type: USER_UPDATE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers : { "Content-Type" : "application/json", Authorization:`Bearer ${userInfo.token}` }};
        const {data} = await axios.put(`/api/users/${id}`,user,config);
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
        setTimeout(()=> dispatch({type: USER_DETAILS_RESET}),5000);
        
    } catch (error) {
        if (error.response.status === 401) {
			dispatch(logout());
		}
         dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const logout =()=> (dispatch)=>{
    dispatch({type: orderActionTypes.ORDER_HISTORY_RESET});
    dispatch({type: USER_LOGOUT});
}