import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from '../utils.js';
import nodemailer from "nodemailer";
import Otp from '../models/otpModel.js';
const userRouter = express.Router();



userRouter.get('/sendemail/:id',expressAsyncHandler(async(req,res) =>{
  const order =await Order.findById(req.params.id);
  const _id=order.user;
  const user = await User.findById(_id);
  console.log(user.name);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    type:"oauth2",
    auth: {
      user: "shubhamvast26@gmail.com", // generated ethereal user
      pass: "shubhamvast2000", // generated ethereal password
    }});
    
    transporter.verify(async function(error, success) {
    if (error) {
      console.log(error);
    } else {
      let info = await transporter.sendMail({
          from: '"Online Shoppy 👻" <shindekirti2014@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "DELIVERY REQUEST AND ORDER DETAILS", // Subject line
          text: "Online Shoppy", // plain text body
          html: `<div style="border:10px solid black,border-radius:10px;">
          <h3>Hii, ${user.name}</h3>
          <h3>Your Payment Has Been Succesfully Done Please Find Your Order Details Below</h3>
          <p>Order ID: <b>${order._id}</b></p>
          <p>Full  Name: ${order.shippingAddress.fullName}</p>
          <p>full Address: ${order.shippingAddress.address}</p>
          <p>City Name: ${order.shippingAddress.city}</p>
          <p>Postal Code: ${order.shippingAddress.postalCode}</p>
          <p>Country Name: ${order.shippingAddress.country}</p>
          <p>Order Price:${order.itemPrice}</p>
          <p>Order Shipping  Price:${order.shippingPrice}</p>
          <p>Order Tax Price:${order.taxPrice}</p>
          <p>Order Total Price:${order.totalPrice}</p>
          <b>We Will Deliver Your Product Within Two to Three Working Days</b>
          <p>If You Have any Query Reach To Us</p>
          <p>Contact Us:<span>chetannaik775@gmail.com</span><p>
          <p>Contact Us:<span>shubhamvast5@gmail.com</span><p>
          <h3>Thanks and Regards from Online Shoppy Team</h3>
          </div>
 `, // html body
      });
      console.log(info);
      console.log("Server is ready to take our messages");
    }});
}));

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
userRouter.get('/getusers',expressAsyncHandler(async(req,res)=>{
  const users =await User.find();
  if(users){
    res.status(200).send(users);
  }
  
}));
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
  const user=await User.findOne({email:req.body.email});
  if(user){
    if(bcrypt.compareSync(req.body.password,user.password)){
      res.send({
        _id:user._id,
        name:user.name,
       email:user.email,
       isAdmin:user.isAdmin,
       token:generateToken(user)
      });
      return;
    }
  }
  res.status(401).send({message:"Invalid email or password"});
}));

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    const user=new User({name:req.body.name,email:req.body.email,
    password: bcrypt.hashSync(req.body.password,8)
  });
  const createdUser=await user.save();
  res.send({
    _id:createdUser._id,
    name:createdUser.name,
   email:createdUser.email,
   isAdmin:createdUser.isAdmin,
   token:generateToken(createdUser)
  });
}));

userRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(user){
      res.send(user);
    }
      else{
        res.status(404).send({ message :'User Not Found'});
      }
}));

userRouter.put('/profile',expressAsyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id);
  if(user){
    user.name= req.body.name || user.name;
    user.email=req.body.email || user.email;
    if(req.body.password){
      user.password=bcrypt.hashSync(req.body.password ,8);
    }
    const updatedUser =await User.save();
    res.send({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      token:generateToken(updatedUser)
    })
  }
}));

userRouter.post('/sendotp',expressAsyncHandler(async(req,res) =>{
   let data =await User.findOne({ email :req.body.email});
   const responseType ={};
   if(data){
     let otpCode =Math.floor((Math.random()*10000)+1);
     let otpData =new Otp({
       email:req.body.email,
       code:otpCode,
       expireIn:new Date().getTime() + 300*1000
     });

     let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      type:"oauth2",
      auth: {
        user: "shubhamvast26@gmail.com", // generated ethereal user
        pass: "Shubham@2000", // generated ethereal password
      }});
      
      transporter.verify(async function(error, success) {
      if (error) {
        console.log(error);
      } else {
        let info = await transporter.sendMail({
            from: '"Online Shoppy Team 👻" <shindekirti2014@gmail.com>', // sender address
            to: data.email, // list of receivers
            subject: "REQUEST FOR CHANGING PASSWORD", // Subject line
            text: "Online Shoppy", // plain text body
            html: `<h3>Your Otp for Changing password is ${otpCode}.The Otp Will Be Valid for 5 Minutes Please Do Not Share This OTP</h3>
            <h3>Thanks and Regards</h3>`, // html body
        });
        console.log(info);
        console.log("Server is ready to take our messages");
      }});
     let otpResponse =await otpData.save();
     responseType.statusText=true;
     responseType.message='Please Check Your Email';
     res.status(200).send(responseType);
   }
   else{
    responseType.statusText=false;
    responseType.message='Email fail';
    res.status(404).json(responseType);
   }
}));

userRouter.post('/changepassword',expressAsyncHandler(async(req,res) =>{
      let data =await Otp.findOne({ email:req.body.email,code:req.body.otpNumber});
      const responseType={};
      console.log(data);
      if(data){
        let currentTime = new Date().getTime();
        let diff = data.expireIn -currentTime;
        if(diff < 0){
          responseType.message=`Token Expire`;
          responseType.statusText='error';
          responseType.message=`Password Expires`;
          responeType.statusText='Error';
          res.status(404).send(responseType);
        }
        else{
          let user =await User.findOne({ email:req.body.email});
          if(req.body.password){
            user.password=bcrypt.hashSync(req.body.password ,8);
          }
          user.save();
          responseType.message=`Password Changes Succesfully`;
          responseType.statusText='Success';
          res.status(200).send(responseType);
        }
      }
      else{
        responseType.message=`Invalid OTP`;
        responeType.statusText='Error';
        res.status(404).send(responseType);
      }
     
}));
export default userRouter;
