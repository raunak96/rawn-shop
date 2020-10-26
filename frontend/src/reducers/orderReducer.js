import orderActionTypes from "../actionTypes/orderActionTypes";
const {ORDER_CREATE_REQ,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,
	ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQ,
    ORDER_PAY_FAIL,ORDER_PAY_SUCCESS,ORDER_PAY_REQ,ORDER_PAY_RESET,
    ORDER_HISTORY_REQ,ORDER_HISTORY_SUCCESS,ORDER_HISTORY_FAIL, ORDER_HISTORY_RESET,ORDER_LIST_FAIL,ORDER_LIST_SUCCESS,ORDER_LIST_REQ,ORDER_DELIVER_FAIL,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_REQ,ORDER_DELIVER_RESET
} = orderActionTypes;

const INITIAL_STATE = {
    order: null, error: null, loading: true, success: null,orderHistory:[]
};

export const orderReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQ:
            return {...state, loading: true};
        case ORDER_CREATE_SUCCESS:
            return {...state, loading: false, order: action.payload, error: null,success:true};
        case ORDER_CREATE_FAIL:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

const INITIAL_STATE1={loading:true, error:null, order:null};

export const orderDetailReducer = (state=INITIAL_STATE1,action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQ:
            return {...state, loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading:false, order: action.payload, error: null};
        case ORDER_DETAILS_FAIL:
            return {...state,loading: false, error: action.payload};
        default:
            return state;
    }
}
const INITIAL_STATE2={loading:null,success:null,error:null};

export const orderPayReducer = (state = INITIAL_STATE2, action) => {
	switch (action.type) {
		case ORDER_PAY_REQ:
			return {
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,success: true, error: null
			};
		case ORDER_PAY_FAIL:
			return {
				loading: false,error: action.payload,success: false
			};
		case ORDER_PAY_RESET:
			return INITIAL_STATE2;
		default:
			return state;
	}
};
export const orderDeliverReducer = (state = INITIAL_STATE2, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQ:
			return {
				loading: true,
			};
		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,success: true, error: null
			};
		case ORDER_DELIVER_FAIL:
			return {
				loading: false,error: action.payload,success: false
			};
		case ORDER_DELIVER_RESET:
			return INITIAL_STATE2;
		default:
			return state;
	}
};

const INITIAL_STATE3={loading: true, error: null, orders:[] };
export const orderHistoryReducer = (state=INITIAL_STATE3, action)=>{
    switch(action.type){
        case ORDER_HISTORY_REQ:
            return {...state, loading:true};
        case ORDER_HISTORY_SUCCESS:
            return {...state, loading:false, error: null, orders: action.payload};
        case ORDER_HISTORY_FAIL:
            return {...state, loading: false, error: action.payload};
        case ORDER_HISTORY_RESET:
            return INITIAL_STATE3;
        default:
            return state;
    }
}

export const orderListReducer = (state=INITIAL_STATE3, action)=>{
    switch(action.type){
        case ORDER_LIST_REQ:
            return {...state, loading:true};
        case ORDER_LIST_SUCCESS:
            return {...state, loading:false, error: null, orders: action.payload};
        case ORDER_LIST_FAIL:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}