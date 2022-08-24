import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, getcomments } from "../actions/productActions";
import { Link } from 'react-router-dom';
export default function CommentScreen(){
    const [comment,setComment]=useState('');
    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo }=userSignin;

    const userComments =useSelector( state =>state.userComments);
    const { commentList=[]} =userComments;
    const dispatch =useDispatch();
    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(getcomments(userInfo.name,comment));
        dispatch(getAllComments());
    }

    useEffect(() =>{
        dispatch(getAllComments());
    },[dispatch]);
    return(
        <>
        <div>
            <h1 className="center2">AMAZONA REVIEWS</h1>
        </div>
        <div>
            <h1 className="center2">Please Add Your query Regarding Your Experience using This website</h1>
        </div>


        <div>
              <form className="form" onSubmit={submitHandler}>
              <div>
                      <h1>ADD </h1>
                  </div>
                  <div>
                      <label htmlFor="text">Enter Your Comment</label>
                      <input type="text" id="comment" placeholder="Enter Comment" required
                      onChange={ e => setComment(e.target.value)}></input>
                      </div>

                       <div>
                       <label/>
                       < button className="primary" type="submit">
                         ADD COMMENT
                       </button>
                      </div>

                      <div>
                          <label/>
                          <div>
                     </div>
                      </div>
        
              </form>
              </div>


              <div>
                  <h1 className="center2">Total Comments:<span className="no">{commentList.length}</span></h1>
              </div>

              <div className="commentScreen">

                  {commentList.map((comment) =>{
                    return(
                        <>
                         <div className="row3">
                  <div>
                      <img src="/images/p10.jpg" className="small3" alt="user"></img>
                      </div>
                  <div className="ok">{comment.name}</div>
                <h2 className="date">Date:{comment.createdAt.substring(0,10)}</h2>
                  
                  </div>

                   <div>
                      <p className="commentpara">{comment.comment}</p>
                  </div>

                  <div className="reply">
                  <Link to="/reply"><button className="primary">Reply</button></Link>
                  </div>
                  <hr/>
                        </>
                    )  
                  })}
                </div>
    </>
    )
}

