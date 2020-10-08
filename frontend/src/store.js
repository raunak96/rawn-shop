import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootreducer = combineReducers({

})
const middlewares = [thunk];
if(process.env.NODE_ENV==="development")
    middlewares=[...middlewares,logger];

const store = createStore(rootreducer,applyMiddleware(...middlewares));

export default store;