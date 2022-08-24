import React, { useState } from "react";
import './index.css';
import HomeScreen  from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import SearchScreen from "./screens/SearchScreen";
import UserList from "./screens/UserList";
import OrderList from "./screens/OrderList";
import ProductAddScreen from "./screens/ProductAddScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
import CommentScreen from "./screens/CommentScreen";
import { getSearchProducts } from "./actions/productActions";
import forgetPasswordScreen from "./screens/forgetPasswordScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";


function App(props) {
   
     const [key,setKey]=useState('');
     const cart=useSelector( state => state.cart);
     const {cartItems}=cart;
     const userSignin=useSelector( state => state.userSignin);
     const { userInfo }=userSignin;
     const dispatch=useDispatch();
     const signOutHandler=()=>{
         dispatch(signout());
     }

     const searchHandler =(e) =>{
         e.preventDefault();
         dispatch((getSearchProducts(key)));
    }
  return (
    <BrowserRouter>
               <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">Online Shoppy</Link>
            </div>
            <div>
            <form class="SearchForm">
          <div>
            <input type="text" id="search"  onChange={(e) => setKey(e.target.value)}  placeholder="Search Results..."></input>
          </div>

          <div>
              <button type="submit" className="searchBtn" onClick={searchHandler}>Search</button>
          </div>
      </form>
      </div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                )}
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                     <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                     <ul className="dropdown-content">
                         <li>
                             <Link to="/orderhistory">Order History</Link>
                         </li>
                         <li>
                             <Link to="/profile" >User Profile</Link>
                             </li>

                             <li>
                             <Link to="/comments">Suggestions</Link>
                             </li>
                             <li>
                    <Link to="#signout" onClick={signOutHandler}>Sign Out</Link>
                    </li>
                     </ul>
                     </div>
                    ):(
                    <Link to="/signin">Sign In</Link>
                    )
                }
               { userInfo && userInfo.isAdmin && (
                   <div className="dropdown">
                       <Link to="#admin">Admin<i className="fa fa-caret-down"></i></Link>
                       <ul className="dropdown-content">
                           <li>
                           <Link to="/dashboard">Dashboard</Link>
                           </li>
                           <li>
                           <Link to="/addproducts">products List</Link>
                           </li>

                           <li>
                           <Link to="/orderlist">Orders</Link>
                           </li>

                           <li>
                           <Link to="/userlist">Users</Link>
                           </li>
                           </ul>
                       </div>
               )}
            </div>
        </header>
        <main>
            <Route path="/search" component={SearchScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/userlist" component={UserList}></Route>
            <Route path="/orderlist" component={OrderList}></Route>
            <Route path="/addproducts" component={ProductAddScreen}></Route>
            <Route path="/dashboard" component={DashBoardScreen}></Route>
            <Route path="/comments" component={CommentScreen}></Route>
            <Route path="/forgetpassword" component={forgetPasswordScreen}></Route>
            <Route path="/changepassword" component={ChangePasswordScreen}></Route>
           </main>
        <footer class="center">
              <h1>OUR COMPANY ADDRESS AND CONTACT DETAILS</h1>
           
             
            <div className="companyInfo">
              <div>
                <div>
                    <h2>GET TO KNOW US</h2>
                  </div>

                <h3>ABOUT US</h3>
                <h3>Careers</h3>
                 <h3>Press Releases</h3>
                 <h3>Gift a Smile</h3>
                 </div>

                <div>
                    <div>
                    <h2>Connect With US</h2>                   
                     </div>
                     <a href="https://www.facebook.com/" target="_blank" alt="facebook3"><img src="images/Instagram.png" className="small4"></img></a><h3>Instagram</h3>
                     <a href="https://www.facebook.com/" target="_blank" alt="facebook4"><img src="images/Facebook.png" className="small4"></img></a><h3>Facebook</h3>
                     <a href="https://www.linkedin.com/feed/" target="_blank" alt="linkedin2"><img src="images/LinkedIn.png" className="small4"></img></a><h3>Linkedin</h3>
                </div>

                <div>
                    <div>
                        <h2>Make Money With Us</h2>
                    </div>

                    <h3>Sell On Online Shoppy</h3>
                    <h3>Sell Under Online Shoppy Accelartor</h3>
                    <h3>Online Shoppy Global Selling</h3>
                    <h3>Become An Affilate</h3>
                    <h3>fulfillment By Online Shoppy</h3>
                    <h3>Advertise Your Product</h3>
                   </div>

                <div>
                    <div>
                        <h2>Let Us Help You!</h2>
                    </div>

                    <h3>Sell On Online Shoppy</h3>
                    <h3>Online Shoppy Global Selling</h3>
                    <h3>Become An Affilate</h3>
                    <h3>fulfillment By Online Shoppy</h3>
                    <h3>Advertise Your Product</h3>
                 </div>
            </div>
            <div>
               
              
                
            </div>
            <div className="rights2">All Rights Reserved || www.onlineshoppy.com
               </div>   
            </footer>
    </div>
    </BrowserRouter>
        )
}
export default App;
