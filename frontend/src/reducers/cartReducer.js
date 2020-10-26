import cartActionTypes from "../actionTypes/cartActionTypes";

const { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD } = cartActionTypes;

const INITIAL_STATE = {
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	shippingAddress: localStorage.getItem("shippingAddress")
		? JSON.parse(localStorage.getItem("shippingAddress"))
		: null,
	paymentMethod: localStorage.getItem("paymentMethod")
		? JSON.parse(localStorage.getItem("paymentMethod"))
		: null
};

export const cartReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const alreadyExists= state.cartItems.find(cartItem=> cartItem._id===action.payload._id);
            if(alreadyExists){
                return {
					...state,
					cartItems: state.cartItems.map(cartItem =>
						cartItem._id === alreadyExists._id ? action.payload : cartItem
					)
				};
            }else{
                return {...state,cartItems:[...state.cartItems,action.payload]};
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem=>cartItem._id!==action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}
        default:
            return state;
    }
}