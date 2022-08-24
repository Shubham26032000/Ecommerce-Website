import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, upadateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const dispatch=useDispatch();
    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo }=userSignin;
    const  userDetails =useSelector( state => state.userDetails);
    const { loading , user, error}=userDetails;
    const userUpdateProfile =useSelector( state =>state.userUpdateProfile);
    const { success:successUpdate ,error:errorUpdate ,loading:loadingUpdate}=userUpdateProfile;
   
    useEffect(()=>{
        if(!user){
            dispatch({ type:USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
        }
    },[dispatch,userInfo._id,user]);

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !==confirmPassword){
            alert('password and Confirm Paasword Not Matching');
        }
        else{
            dispatch(upadateUserProfile({userId:user._id,name,email,password}));
        }
    }
    return(
        <>
         < form className="form" onSubmit={submitHandler}>
              <div>
                  <h1>User Profile</h1>
              </div>
              {
                  loading ? <LoadingBox></LoadingBox>
                  : 
                  error ?
                  <MessageBox></MessageBox>
                  :
                  <>
                  { loadingUpdate && <LoadingBox></LoadingBox>}
                  { errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
                  { successUpdate && <MessageBox>Profile Succesfully Updated</MessageBox>}
                   <div>
                       <label htmlFor="name">Name</label>
                        <input id="name"  type="text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}></input> 
                   </div>

                   <div>
                       <label htmlFor="email">Email</label>
                        <input id="email"  type="email" placeholder="Enter E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}></input> 
                   </div>

                   <div>
                       <label htmlFor="password">Password</label>
                        <input id="password"  type="password" placeholder="Enter Password"  onChange={(e) => setPassword(e.target.value)}></input> 
                   </div>

                   <div>
                       <label htmlFor="confirmpassword"> Confirm Password</label>
                        <input id="ConfirmPassword"  type="password" placeholder="Enter Confirm Password" onChange={ (e) =>setConfirmPassword(e.target.value)}></input> 
                   </div>
                      

                      <div>
                          <label>
                              <button className="primary" type="submit">Update</button>
                          </label>
                      </div>
                  </>
              }

             </form>
        </>
    )
}