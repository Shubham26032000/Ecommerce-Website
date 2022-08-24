import axios from "axios";
import Axios from "axios";
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, SEND_EMAIL_FAIL, SEND_EMAIL_FOR_OTP_FAIL, SEND_EMAIL_FOR_OTP_REQUEST, SEND_EMAIL_FOR_OTP_SUCCESS, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const register=(name,email,password)=>async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}});
    try{ 
   const { data} =await Axios.post('/api/users/register',{name, email,password});
   dispatch({ type:USER_REGISTER_SUCCESS,payload:data});
   dispatch({ type:USER_SIGNIN_SUCCESS,payload:data});
   localStorage.setItem("userInfo",JSON.stringify(data));
    }
    catch(error){
        dispatch({type:USER_REGISTER_FAIL,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message,})
    }
}


export const signin=(email,password)=>async(dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
    try{ 
   const { data} =await Axios.post('/api/users/signin',{ email,password});
   dispatch({ type:USER_SIGNIN_SUCCESS,payload:data});
   localStorage.setItem("userInfo",JSON.stringify(data));
    }
    catch(error){
        dispatch({type:USER_SIGNIN_FAIL,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message,})
    }
}

export const userGetList =() =>async(dispatch) =>{
    dispatch({ type:USER_LIST_REQUEST});
    try {
        const { data } =await Axios.get('/api/users/getusers');
        dispatch({type:USER_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:USER_LIST_FAIL,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message,});
    }
}

export const signout=()=>(dispatch)=>{
   localStorage.removeItem('userInfo');
   localStorage.removeItem('cartItems');
   localStorage.removeItem('shippingAddress');
   dispatch({type:USER_SIGNOUT});
}

export const detailsUser=(userId)=>async(dispatch,getState)=>{
    dispatch({ type : USER_DETAILS_REQUEST, payload:userId});
    const {userSignin:{ userInfo}}=getState();
    try {
        const {data} = await Axios.get(`/api/users/${userId}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type :USER_DETAILS_SUCCESS , payload:data});
    } catch (error) {
        dispatch ({type: USER_DETAILS_FAIL , payload:error.message});
    }
}

export const upadateUserProfile=(user) => async(dispatch,getState)=>{
    dispatch({ type:USER_UPDATE_PROFILE_REQUEST, payload:user});
    const { userSignin:{userInfo}}=getState();
    try {
        const { data}=await Axios.put(`/api/users/profile`,user,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type:USER_UPDATE_PROFILE_SUCCESS ,payload:data});
        dispatch({ type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch (error) {
        dispatch({ type:USER_UPDATE_PROFILE_FAIL,payload:error.message});
    }
}

export const sendEmail=(id) =>async(dispatch) =>{
    dispatch({ type:SEND_EMAIL_REQUEST,payload:id});
    try {
        const { data} =await axios.get(`/api/users/sendemail/${id}`);
        dispatch({ type:SEND_EMAIL_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:SEND_EMAIL_FAIL,payload:error.message});
    }
}

export const sendEmailForOtp=(email) => async(dispatch) =>{
    dispatch({ type:SEND_EMAIL_FOR_OTP_REQUEST,payload:email});
    try {
        const { data }=await axios.post('/api/users/sendotp',{ email});
        dispatch({ type:SEND_EMAIL_FOR_OTP_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:SEND_EMAIL_FOR_OTP_FAIL,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message});
    }
}


export const changePasword =(email,otpNumber,password) => async(dispatch) =>{
    dispatch({ type:CHANGE_PASSWORD_REQUEST,payload:{ email,otpNumber,password}});
    try {
        const { data } =await axios.post('/api/users/changepassword',{ email,otpNumber,password});
        dispatch({ type:CHANGE_PASSWORD_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:CHANGE_PASSWORD_FAIL,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message});
    }
}

