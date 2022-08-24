import React from "react";

export default function User(props){
    const { users }=props;
    return(
        <>
         <tr key ={users._id}>
        <td>{users._id}</td>
        <td>{users.name}</td>
        <td>{users.email}</td> 
        <td className={ users.isAdmin?"ok":"no"}>{users.isAdmin ?"YES":"NO"}</td>
        </tr>
    </>
    )
}