import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
export default function OrderHistoryScreen(props){
    const orderMineList =useSelector( state => state.orderMineList);
    const { loading ,error ,orders} =orderMineList;
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine());
    },[dispatch]);
    return(
        <div>
            <h1>Order History</h1>
        { loading ? <LoadingBox></LoadingBox>:
        error?<MessageBox>{error}</MessageBox>:(
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTALPRICE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    { orders.map((order) =>{
                        return (
                        <tr key ={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>₹{order.totalPrice}</td>
                            <td className={order.isPaid?"ok":"no"}>{order.isPaid?"Paid":"Not Paid"}</td>
                            <td className={order.isDelivered?"ok":"no"}>{order.isDelivered? "Delivered":"Not Delivered"}</td>
                            <td>
                                <button type="button" className='small' onClick={ () => {props.history.push(`/order/${order._id}`)}}>Details</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
        </div> 
    )
}