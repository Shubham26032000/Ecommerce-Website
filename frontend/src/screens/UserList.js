import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userGetList } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import User from "../components/User";

export default function UserList(){
    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo}=userSignin;
    const dispatch =useDispatch();
    const users =useSelector( state => state.getAllUsers);
    const {loading ,userList ,error} =users;
    useEffect(()=>{
        dispatch(userGetList());
    },[dispatch]);
    return(
        <>
        {
            userInfo!=null && !userInfo.isAdmin?
            (
                <MessageBox variant="danger">Only Admin Can Access This Web Page <Link to="/" className="brand">Go To Home Page</Link></MessageBox>
            ):
            (
                <>
               <div>
            <h1>Users</h1>
        { loading ? <LoadingBox></LoadingBox>:
        error?<MessageBox>{error}</MessageBox>:(
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                         <th>Is Admin</th>
                    </tr>
                </thead>

                <tbody>
                    { userList.map((users) =>{
                        return (
                      <User key={users._id} users={users}></User>
                        )
                    })}
                </tbody>
            </table>
        )
    }
        </div>
                </>
            )
        }
       
</>
           )
}