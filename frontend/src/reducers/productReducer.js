import productActionTypes from "../actionTypes/productActionTypes";
const {PRODUCT_LIST_REQ,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQ,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_REQ,PRODUCT_DELETE_FAIL,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_REQ,PRODUCT_UPDATE_REQ,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,PRODUCT_CREATE_REVIEW_REQ,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_RESET,PRODUCT_TOP_REQ,PRODUCT_TOP_SUCCESS,PRODUCT_TOP_FAIL}=productActionTypes;

const INITIAL_STATE={
    products:[],loading:true,error:null,success:false,pages:0,pageNumber:0, topProducts:[]
};

const productReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQ:
        case PRODUCT_DELETE_REQ:
        case PRODUCT_CREATE_REQ:
        case PRODUCT_TOP_REQ:
            return{
                ...state, loading:true,error: null
            };
        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,...action.payload, loading:false,error:null
            };
        case PRODUCT_CREATE_SUCCESS:
            return {...state, loading: false, error: null}
        case PRODUCT_DELETE_SUCCESS:
            return {...state, success: true, loading: false}
        case PRODUCT_TOP_SUCCESS:
            return {...state, loading: false, topProducts: action.payload}
        case PRODUCT_LIST_FAIL:
        case PRODUCT_DELETE_FAIL:
        case PRODUCT_CREATE_FAIL:
        case PRODUCT_TOP_FAIL:
            return{
                ...state, loading:false,error:action.payload
            };
        default:
            return state;
    }
}

const INITIAL_STATE1={
    product:{},loading:true,error:null
};

const productDetailsReducer = (state=INITIAL_STATE1,action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQ:
        case PRODUCT_UPDATE_REQ:
            return {...state, loading:true, error: null};
        case PRODUCT_DETAILS_SUCCESS:
        case PRODUCT_UPDATE_SUCCESS:
            return {...state, loading:false, product: action.payload,error:null};
        case PRODUCT_DETAILS_FAIL:
        case PRODUCT_UPDATE_FAIL:
            return {...state,loading:false, error:action.payload};
        default:
            return state;
    }
}

const INITIAL_STATE2 = {loading:null, error: null, success: null}
const productReviewReducer = (state=INITIAL_STATE2,action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQ:
            return {...state, loading: true, error: null};
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {...state, loading:false, success: true};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {...state, loading: false, error: action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return INITIAL_STATE2;
        default:
            return state;
    }
}


export {productReducer,productDetailsReducer, productReviewReducer};