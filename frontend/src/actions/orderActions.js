import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_UPDATE_DELIVERY_FAIL, ORDER_UPDATE_DELIVERY_REQUEST, ORDER_UPDATE_DELIVERY_SUCCESS, OREDER_DETAILS_FAIL } from "../constants/orderConstants";
import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
export const createOrder =(order)=> async(dispatch,getState)=>{
    dispatch( { type: ORDER_CREATE_REQUEST ,payload:order});
    try {
        const { userSignin:{ userInfo }}=getState();
        const { data }=await Axios.post('/api/orders',order,{
             headers:{
                 Authorization: `Bearer ${userInfo.token}`
             }
        });
        dispatch( { type: ORDER_CREATE_SUCCESS ,payload: data.order });
        dispatch( { type:CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ type:ORDER_CREATE_FAIL, payload:error.message});
    }
}

export const detailsOrder=(orderId) =>async(dispatch,getState)=>{
    dispatch({ type :ORDER_DETAILS_REQUEST,payload:orderId});
    try {
        const { userSignin:{ userInfo }}=getState();
        const { data }= await Axios.get(`/api/orders/${orderId}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type:ORDER_DETAILS_SUCCESS ,payload:data});
    } catch (error) {
        dispatch({ type:OREDER_DETAILS_FAIL,payload:error.message});
    }
}

export const payOrder=(order,paymentResult)=>async(dispatch,getState)=>{
    dispatch({ type: ORDER_PAY_REQUEST, payload:{ order ,paymentResult}});
    const { userSignin:{ userInfo }}=getState();
    try {
        const { data}=await Axios.put(`/api/orders/${order._id}/pay`,paymentResult,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type :ORDER_PAY_SUCCESS ,payload:data});
    }
        catch(error){
        dispatch({ type:ORDER_PAY_FAIL,payload:error.message});
        }
}

export const listOrderMine =() => async(dispatch,getState) =>{
   dispatch({ type:ORDER_MINE_LIST_REQUEST});
   const { userSignin:{userInfo}} =getState();
   try {
       const { data } =await Axios.get('/api/orders/mine',{
           headers:{
               Authorization:`Bearer ${userInfo.token}`,
           }
       });
       dispatch({ type: ORDER_MINE_LIST_SUCCESS,payload:data});
   } catch (error) {
       dispatch({ type:ORDER_MINE_LIST_FAIL,payload:error.message});
   }
}


export const getAllOrderList =() => async(dispatch) =>{
    dispatch({type:ORDER_LIST_REQUEST});
    try {
        const { data }= await Axios.get('/api/orders/orderlist');
        dispatch({ type :ORDER_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:ORDER_LIST_FAIL,payload:error.message});
    }
}

export const updateOrderStatus =(id) => async(dispatch) =>{
    dispatch({ type :ORDER_UPDATE_DELIVERY_REQUEST,payload:id});
    try {
        const { data } =await Axios.put(`/api/orders/${id}`,id);
        dispatch({ type:ORDER_UPDATE_DELIVERY_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:ORDER_UPDATE_DELIVERY_FAIL,payload:error.message});
    }
}


