import axios from 'axios';
import cartActionTypes from "../actionTypes/cartActionTypes";

const { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD } = cartActionTypes;

export const addToCart=(id,qty)=>async (dispatch,getState)=>{
    try {
        const {data:{image,name,price,_id,countInStock}} = await axios.get(`/api/products/${id}`);
        dispatch({
			type: CART_ADD_ITEM,
			payload: { image, name, price, _id, countInStock, qty }
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error.message);
    }
}

export const removeFromCart = (id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:CART_REMOVE_ITEM,
            payload:id
        });
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error.message);
    } 
}

export const saveShippingAddress = (address)=>dispatch=>{
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS , payload: address});
    localStorage.setItem("shippingAddress", JSON.stringify(address));
}

export const savePaymentMethod = (paymentMethod)=>dispatch=>{
    dispatch({type:CART_SAVE_PAYMENT_METHOD,payload: paymentMethod});
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
}