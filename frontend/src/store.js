import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer,getOrderListReducer, updateOrderReducer } from './reducers/orderReducers';
import {  addNewProductReducer, addNewReviewReducer, commentsListReducer, getCommentsListReducer, getReviewReducer, productDetailReducer, productListReducer } from './reducers/productReducers';
import {changePaswordReducer, emailReducer, sendOtpReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';



const initialState={
    userSignin:{
        userInfo:localStorage.getItem("userInfo") ?JSON.parse(localStorage.getItem("userInfo")):null
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingAddress:localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{},
        paymentMethod:'PayPal',
    },
};
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer, 
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderMineList:orderMineListReducer,
    getAllUsers:userListReducer,
    getOrderList:getOrderListReducer,
    updatedOrders:updateOrderReducer,
    newProduct:addNewProductReducer,
    reviews:addNewReviewReducer,
    getAllReviews:getReviewReducer,
    commentList:commentsListReducer,
    userComments:getCommentsListReducer ,
    emailmessage:emailReducer,
    emailSendStatus:sendOtpReducer,
    changePasswordData:changePaswordReducer
});
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;
