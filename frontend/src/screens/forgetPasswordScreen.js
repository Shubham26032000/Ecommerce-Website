import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendEmailForOtp } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ForgetPasswordScreen(){
    const [email,setEmail]=useState('');
    const dispatch=useDispatch();
    const emailSendStatus=useSelector( state => state.emailSendStatus);
    const {error, status,loading}=emailSendStatus;
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(sendEmailForOtp(email));
    }
    return(
        <>
         <div>
              <form className="form" onSubmit={submitHandler}>
              <div>
                      <h1>Reset Password</h1>
                  </div>

                  {
                      loading && <LoadingBox></LoadingBox>
                  }
                    {!error?<MessageBox variant="success">Your OTP send To Your G-mail After Entering Your E-mail</MessageBox>:
                     <MessageBox variant="danger">Please Provide Your Valid E-mail</MessageBox>
                    }
                  <div>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Enter email" required
                      onChange={ e => setEmail(e.target.value)}></input>
                      </div>

                      <div>
                       <label/>
                       <button className="primary" type="submit">
                           RESET PASSWORD
                       </button>
                      </div>
    
                      <div>
                          <label/>
                          <div>
                            <Link to="/changepassword">Change Password After Receiving OTP</Link>
                             
                              </div>
                      </div>
        
                       <div>
                          <label/>
                          <div>
                            <Link to="/signin">BACK</Link>
                             
                              </div>
                      </div>
        
        
              </form>
              </div>
        </>
    )
}

export default ForgetPasswordScreen;