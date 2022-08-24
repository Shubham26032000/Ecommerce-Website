import express from "express";
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

const app=express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
const port=process.env.PORT || 5000;

import cors from "cors";
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/onlineshoppy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
  console.log("Conneted");
}).catch((error)=>{
   console.log(error);
});



// app.get('/api/products/:id',(req,res)=>{
//    const product = data.products.find((x)=> x._id === req.params.id);
//    if(product)
//    {
//      res.send(product);
//    }
//    else{
//    res.status(400).send({ message :'Product Not Found'});
//    }
// })
// app.get('/api/products',(req,res)=>{
//   res.send(data.products);
// });

app.use('/api/users',userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/',(req,res)=>{
    res.send('Server Is Ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
 
});
app.listen(5000,()=>{
    console.log(`Server At http://localhost:${port}`);
})
