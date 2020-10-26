import userActionTypes from "../actionTypes/userActionTypes";
const {USER_LOGIN_FAIL,USER_LOGIN_REQ,USER_LOGIN_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQ,USER_REGISTER_SUCCESS,USER_LOGOUT,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_REQ,USER_UPDATE_PROFILE_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQ,USER_DETAILS_SUCCESS,
USER_LIST_FAIL,USER_LIST_REQ,USER_LIST_SUCCESS,USER_DELETE_REQ,USER_DELETE_SUCCESS,USER_DELETE_FAIL,USER_UPDATE_FAIL,USER_UPDATE_SUCCESS,USER_UPDATE_REQ,USER_DETAILS_RESET} = userActionTypes;

const INITIAL_STATE = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loading: null,
    error:null,
    success:null,
    users:[],
    otherUser: null,
    successUpdate: null,
    errorUpdate: null
};

export const userReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_REQ:
        case USER_REGISTER_REQ:
        case USER_DETAILS_REQ:
        case USER_UPDATE_PROFILE_REQ:
        case USER_LIST_REQ:
        case USER_DELETE_REQ:
        case USER_UPDATE_REQ:
            return {...state,loading:true, error:null, success: null,successUpdate: null, errorUpdate: null}
        
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {...state,error:null,userInfo:action.payload,loading:false}
        case USER_DETAILS_SUCCESS:
            return {...state, loading: false, otherUser: action.payload, error: null}
        case USER_UPDATE_SUCCESS:
            return {...state, loading:false, successUpdate: true, errorUpdate:null, otherUser: action.payload}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {...state, error:null, userInfo:action.payload,loading:false, success: true}
        case USER_LIST_SUCCESS:
            return { ...state, loading:false, users: action.payload, error:null}
        case USER_DELETE_SUCCESS:
            return {...state, loading:false, success: true, error: null}
        

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
        case USER_DETAILS_FAIL:
        case USER_UPDATE_PROFILE_FAIL:
        case USER_LIST_FAIL:
        case USER_DELETE_FAIL:
            return {...state,error:action.payload,loading:false}
        case USER_UPDATE_FAIL:
            return {...state, errorUpdate: action.payload, loading:false}
        case USER_DETAILS_RESET:
            return {...state, successUpdate: false, errorUpdate: null}

        case USER_LOGOUT:
            localStorage.removeItem("userInfo");
            return {...INITIAL_STATE, userInfo:null}
        default:
            return state;
    }
}