import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import LoadingBox  from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { addReview, detailsProduct, getReview } from "../actions/productActions";
import Review from "../components/Review.js";
import { ADD_PRODUCT_REVIEW_RESET } from "../constants/productConstants";

export default function ProductScreen(props)
{
    const reviews=useSelector((state) => state.getAllReviews);
    const {loading1, reviewList=[],error1}=reviews;
    const [review,setReview]=useState('');
    const [rating,setRating]=useState('1');
    const dispatch=useDispatch();
    const productId=props.match.params.id;
   
    // const cart=useSelector( state => state.cart);
    // const {cartItems}=cart;
    const userSignin=useSelector(state => state.userSignin);
    const { userInfo }=userSignin;
    const [qty ,setQty]=useState(1);
    // const product=data.products.find(x => x._id === props.match.params.id);
    const productDetails=useSelector((state) => state.productDetails);
    const { loading ,error ,product}=productDetails;
  

    useEffect(() =>{
        dispatch(detailsProduct(productId));
        dispatch(getReview(productId));
    },[dispatch,productId]);
    // if(!product)
    // {
    //     return <div className="danger"> Produt Not Found</div>
    // }

    const addToCartHandler=()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    const addReviewHandler =(e) =>{
        e.preventDefault();
        dispatch({ type:ADD_PRODUCT_REVIEW_RESET});
        dispatch(addReview(userInfo.name,review,rating,productId));   
        dispatch(getReview(productId));
    }
//     useEffect(() =>{
//         dispatch(getReview(productId));
//    },[dispatch,productId]);
   
 return (
        <>
           <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
            <Link to="/">Back To Result</Link>
      <div className="row top">
          <div className="col-2">
      <img className="large large2" src={product.image} alt={product.name} />
          </div>

          <div className="col-1">
              <ul>
               <li>
                   <h1>{product.name}</h1>
               </li> 
               <li>
                   <Rating 
                   rating= {product.rating} 
                   numReviews={reviewList.length}>
                </Rating>
               </li>
               <li>Price: ₹{product.price}</li>
               <li>Description: <p>{product.description}</p></li>

           
               <li>
                   <img src={product.image} class="small2" alt={product.name}></img> 
               </li>
            </ul>
              </div>

              <div className="col-1">
                  <div className="card card-body">
                      <ul>
                          <li>
                              <div className="row">
                                  <div>Price</div>
                                  <div className="price">₹{product.price}</div>
                              </div>
                          </li>

                          <li>
                            <div className="row">
                                <div>Status</div>
                                <div>
                                     {product.countInStock > 0 ? (
                                         <span className="ok">In Stock</span>):(
                                     <span className="no">Unavailable</span>)}
                                </div>
                            </div>
                        </li>
                         {
                             product.countInStock > 0 && (
                                 <>
                                 <li>
                                     <div className="row">
                                         <div> Qty</div>
                                         <div>
                                             <select value={qty} onChange={e => setQty(e.target.value)}>
                                                 {
                                                     [...Array(product.countInStock).keys()].map(x =>(
                                                         <option key={x+1} value={x+1}>{x+1}</option>
                                                     ))
                                                 }
                                             </select>
                                         </div>
                                     </div>
                                 </li>
                                <li>
                                <button onClick={addToCartHandler} className="primary block">Add To Cart</button>
                            </li>
                            </>
                             )
                         }
                       
                      </ul>
                  </div>
              </div>
      </div>
      </div>
  )}
</div>


<div>
    {
        userInfo!=null?(
            <>
              <form className="form" onSubmit={addReviewHandler}>
              <div>
                      <h1>ADD YOUR REVIEW</h1>
                      
                  </div>
                  {
                      loading1 && <LoadingBox></LoadingBox>
                  }
                  {
                      error1 && <MessageBox variant="danger">{error}</MessageBox>
                  }
            
                  <div>
                      <label htmlFor="review">Enter Your Review:</label>
                      <input type="text" id="review" placeholder="Enter Your Review" required
                      onChange={ e => setReview(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="number">Enter Your Rating:</label>
                     <select onChange={e => setRating(e.target.value)}>
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                     </select>
                      </div>
                      <div>
                       <label/>
                       < button className="primary" type="submit">
                           ADD YOUR REVIEW
                       </button>
                      </div>   
                          </form>
            </>
        ):
        (
            <>
            <div>
                <h1 className="no">Please Log in To add Your Review</h1>
                <Link to="/signin">Go To Sign in Screen</Link>
            </div>
            </>
        )
    }
               
              </div>

              <div>                
              <h1>TOTAL REVIEW:<span className="no">{reviewList.length}</span></h1>
              </div>
              <div className="row3">
                  {reviewList.map((allReview)=>{
                          return(
                              <>
                           <Review key={allReview._id} allReview={allReview}></Review>
                           </>
 
                       )
                      })
                  }
              </div>
        </>
    )
}