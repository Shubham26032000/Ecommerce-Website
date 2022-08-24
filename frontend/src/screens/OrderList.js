import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getAllOrderList, updateOrderStatus } from "../actions/orderActions";
import { Link } from "react-router-dom";
export default function OrderList(props){
    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo}=userSignin;
    const orderMineList =useSelector( state => state.getOrderList);
    const { loading ,error ,orders} =orderMineList;
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getAllOrderList());
    },[dispatch]);
    let isUpdated=false;
    const updateOrderDeliveryStatus =(id) =>{
        if(!isUpdated){
        dispatch(updateOrderStatus(id));
        dispatch(getAllOrderList());
        isUpdated=true;
        }
}
    return(
        <>
        {
            userInfo!=null && !userInfo.isAdmin?
            (
                <>
                 <MessageBox variant="danger">Only Admin Can Access This Web Page <Link to="/" className="brand">Go To Home Page</Link></MessageBox>
                </>
            ):
            (
                <>
                  <div>
            <h1>Total Order List</h1>
        { loading ? <LoadingBox></LoadingBox>:
        error?<MessageBox>{error}</MessageBox>:(
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>DATE</th>
                        <th>ADDRESS</th>
                        <th>CITY</th>
                        <th>POSTAL CODE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>TOTAL PRICE</th>
                        <th>ACTIONS</th>
                        <th>STATUS</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) =>{
                        return (
                             
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.shippingAddress.fullName}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.shippingAddress.address}</td>
                            <td>{order.shippingAddress.city}</td>
                            <td>{order.shippingAddress.postalCode}</td>
                            <td className={order.isPaid ?"ok":"no"}>{order.isPaid?"Paid":"Not Paid"}</td>
                            <td className={order.isDelivered ?"ok":"no"}>{order.isDelivered?"Delivered":"Not Delivered"}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                         <button type="button" className='small' onClick={() => { props.history.push(`/order/${order._id}`)}}>Details</button>
                         </td>

                         <td>
                             <button type="submit" className="small" disabled={order.isDelivered} onClick={() =>updateOrderDeliveryStatus(order._id)}>Delivered</button>
                         </td>
                         </tr>
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