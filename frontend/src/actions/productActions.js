import axios from "axios";
import productActionTypes from "../actionTypes/productActionTypes";

const {PRODUCT_LIST_REQ,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQ,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_REQ,PRODUCT_DELETE_FAIL,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_REQ,PRODUCT_UPDATE_REQ,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_REQ,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_RESET,PRODUCT_TOP_REQ,PRODUCT_TOP_SUCCESS,PRODUCT_TOP_FAIL}=productActionTypes;


export const listProducts = (keyword="",pageNumber="")=> async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQ});
        const {data}= await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload: data});

    } catch (error) {
        dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const getTopRatedProducts = ()=> async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_TOP_REQ});
        const {data}= await axios.get(`/api/products/top`);
        dispatch({type:PRODUCT_TOP_SUCCESS,payload: data});

    } catch (error) {
        dispatch({
			type: PRODUCT_TOP_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const getProductDetails = (id)=> async (dispatch)=>{
    try {
        dispatch({ type: PRODUCT_DETAILS_REQ });
		const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const deleteProduct = (id) => async (dispatch, getState)=>{
    try {
        dispatch({type: PRODUCT_DELETE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers:{Authorization: `Bearer ${userInfo.token}`}};
        await axios.delete(`/api/products/${id}`, config);
        dispatch({type: PRODUCT_DELETE_SUCCESS});
        dispatch(listProducts());

    } catch (error) {
        dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const createProduct = (history) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers:{Authorization: `Bearer ${userInfo.token}`}};
        const {data} = await axios.post(`/api/products`,{}, config);
        dispatch({type: PRODUCT_CREATE_SUCCESS});
        history.push(`/products/${data._id}`);

    } catch (error) {
        dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const updateProduct = (history,product,id) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_UPDATE_REQ});
        const {user:{userInfo}} = getState();
        const config = { headers:{Authorization: `Bearer ${userInfo.token}`}};
        const {data} = await axios.put(`/api/products/${id}`,product, config);
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
        history.push(`/admin/productList`);

    } catch (error) {
        dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}

export const createProductReview = (id, review) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQ});
        const {user:{userInfo}} = getState();
        const config = { 'Content-Type': 'application/json', headers:{Authorization: `Bearer ${userInfo.token}`}};
        const {data} = await axios.post(`/api/products/${id}/reviews`,review, config);
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
    }
}


export const reviewReset = ()=>({
    type: PRODUCT_CREATE_REVIEW_RESET
})