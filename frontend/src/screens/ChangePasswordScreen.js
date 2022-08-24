import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasword } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";



function ChangePasswordScreen(){
    const [email,setEmail]=useState('');
    const [otpNumber,setOtpNumber]=useState('');
    const [password,confirmPassword]=useState('');
    const dispatch=useDispatch();
    const changePasswordData =useSelector(state =>state.changePasswordData);
    const { error ,changePasswordStatus,loading} =changePasswordData;
    const submitHandlerForChangePassword =(e) =>{
        e.preventDefault();
        dispatch(changePasword(email,otpNumber,password));
    }
    return(
        <>
         <div>
              <form className="form" onSubmit={submitHandlerForChangePassword}>
              <div>
                      <h1>Change Password</h1>
                  </div>
                  {
                      loading && <LoadingBox></LoadingBox>
                  }
                  {changePasswordStatus && <MessageBox variant="success">Your Password Changes Succesfully</MessageBox>
                    }
                {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                }
                  <div>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Enter email" required
                      onChange={ e => setEmail(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="number">Enter OTP NUMBER:</label>
                      <input type="number" id="number" placeholder="Enter OTP number" required
                      onChange={ e => setOtpNumber(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" placeholder="Enter password" required
                      onChange={ e => confirmPassword(e.target.value)}></input>
                      </div>
                      <div>
                       <label/>
                       <button className="primary" type="submit">
                         RESET PASSWORD  
                       </button>
                      </div>

                     

                     
        
              </form>
              </div>

        </>
    )
}

export default ChangePasswordScreen;