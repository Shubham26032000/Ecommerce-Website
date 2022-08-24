import React from "react";
import Rating from "./Rating";

export default function Review(props){
    const { allReview } =props;
    return(
           <div className="box box1">
           <div className="row2">
               <div className="row2">
                 <img src="/images/p10.jpg" alt="" className="small3"></img>
                  <h1 className="ok">{allReview.name}</h1>
                  </div>
                  <div>
           <h2 className="date">Date:{allReview.createdAt.substring(0,10)}</h2>
           </div>
            </div>

           <div>
           <p>{allReview.review}</p>
           </div>

           <div className="row3">
             <span className="no">Rating:</span><Rating rating={allReview.rating} numReviews={8}></Rating> 
           </div>
       </div>
    )
}