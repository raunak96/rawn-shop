import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { orderDetailReducer, orderPayReducer, orderReducer, orderHistoryReducer, orderDeliverReducer, orderListReducer } from "./reducers/orderReducer";
import{ productDetailsReducer, productReducer, productReviewReducer} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const rootreducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer, // for creating order(placeOrder component)
    orderDetails: orderDetailReducer, // for getOrderById (OrderPage)
    orderPay: orderPayReducer, // update payment status
    orderHistory: orderHistoryReducer, // get logged in user's orderHistory(ProfilePage)
    orderDelivery: orderDeliverReducer, // update delivery status
    orderList: orderListReducer // get all orders
});
var middlewares = [thunk];
if(process.env.NODE_ENV==="development")
    middlewares=[...middlewares,logger];

const store = createStore(rootreducer,applyMiddleware(...middlewares));

export default store;