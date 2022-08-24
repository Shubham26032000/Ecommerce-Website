import Axios from "axios";
import {  ADD_NEW_PRODUCT_FAIL, ADD_NEW_PRODUCT_REQUEST, ADD_NEW_PRODUCT_SUCCESS, ADD_PRODUCT_REVIEW_FAIL, ADD_PRODUCT_REVIEW_REQUEST, ADD_PRODUCT_REVIEW_SUCCESS, ADD_TO_COMMENT_FAIL, ADD_TO_COMMENT_REQUEST, ADD_TO_COMMENT_SUCCESS, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_PRODUCT_REVIEW_FAIL, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts=()=> async (dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await Axios.get('/api/products');
        console.log(data);
        dispatch({type:PRODUCT_LIST_SUCCESS, payload : data});
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL ,payload: error.message });
    }
};

export const detailsProduct=(productId) => async(dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST ,payload: productId});
    try {
        const { data }= await Axios.get(`/api/products/${productId}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS ,payload: data});
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL ,payload:error.response &&  error.response.data.message
        ? error.response.data.message
        : error.message,
        })
    }
}

export const filterProducts=(searchKey) =>async(dispatch,getState) =>{
     let { productList:{ products }}=getState();
     dispatch({ type: PRODUCT_LIST_REQUEST});
     try {
        const {filterProduct} =products.filter(products => products.name.toLowerCase().includes(searchKey));
     dispatch({ type: PRODUCT_LIST_SUCCESS,payload: filterProduct});
        
     } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL ,payload: error.message })  ;        
     }    
}

export const addProducts =(products) =>async (dispatch) =>{
      dispatch({ type:ADD_NEW_PRODUCT_REQUEST,payload:products});
      try {
        const { data } =await Axios.post('/api/products/addproducts',products);
        dispatch( { type:ADD_NEW_PRODUCT_SUCCESS,payload:data.products}); 
      } catch (error) {
        dispatch({type:ADD_NEW_PRODUCT_FAIL ,payload: error.message })  ;      
      }
}

export const addReview =(name,review,rating,id) => async(dispatch) =>{
    dispatch({ type: ADD_PRODUCT_REVIEW_REQUEST,payload:{ name,review,rating,id}});
    try {
        const { data } =await Axios.post(`/api/products/addreview/${id}`,{name,review,rating});
        dispatch({ type:ADD_PRODUCT_REVIEW_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:ADD_PRODUCT_REVIEW_FAIL ,payload: error.message })  ;   
    }
}

export const getReview =(id) => async(dispatch) =>{
    dispatch({ type:GET_PRODUCT_REVIEW_REQUEST,payload:id});
    try {
        const { data } =await Axios.get(`/api/products/getreview/${id}`);
        dispatch({ type: GET_PRODUCT_REVIEW_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:GET_PRODUCT_REVIEW_FAIL ,payload: error.message })  ;   
    }
}

export const getcomments=(name,comment) =>async(dispatch) =>{
    dispatch({ type:ADD_TO_COMMENT_REQUEST,payload:{name,comment}});
    try {
        const { data }=await Axios.post('/api/products/comments',{ name,comment});
        dispatch({ type: ADD_TO_COMMENT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:ADD_TO_COMMENT_FAIL ,payload: error.message })  ;  
    }
}

export const getAllComments =() => async(dispatch) =>{
    dispatch({ type:GET_COMMENT_REQUEST});
    try {
        const { data }=await Axios.get('/api/products/getcomments');
        dispatch({ type:GET_COMMENT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type:GET_COMMENT_FAIL,payload:error.message});
    }
}


export const getSearchProducts=(key)=> async (dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST,
        payload:key
    });

    try {
        const { data } = await Axios.post('/api/products/search',{key});
        console.log(data);
        dispatch({type:PRODUCT_LIST_SUCCESS, payload : data});
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL ,payload:error.response &&  error.response.data.message
            ? error.response.data.message
            : error.message, });
    }
};
