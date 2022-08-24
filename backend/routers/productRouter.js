import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js'; 
import Comment from '../models/commentModel.js';
import multer from 'multer';
const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './frontend/public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now()+'_'+file.originalname)
  }
})

const upload = multer({ storage: storage })

productRouter.post('/addproducts', upload.single('myfile'),expressAsyncHandler(async(req,res)=>{
  let image =(req.file) ? req.file.filename :null;
  let { name,brand,category,price,description,countInStock,rating,review}=req.body;
  const newProduct=new Product({
    name,
    brand,
    category,
    price,
    description,
    countInStock,
    rating,
    numReviews:review,
    image:"/images/"+image
  });
 
  let productData=await newProduct.save();   
if(productData){
res.status(200).send({message:'Product Successfully Added'});
}
else{
res.status(500).send({message:'fail To Add Product'});
}
}));

productRouter.get('/getcomments',expressAsyncHandler(async(req,res) =>{
  const comments =await Comment.find({});
  if(comments){
    res.status(200).send(comments);
  }
  else{
    res.status(404).send({message:'Comments Not Found'});
  }
}));


productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send({products});
  })
);



productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get('/:id',expressAsyncHandler(async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  }
  catch(err)
  {
    res.status(404).send({ message: 'Product Not Found' });
 
  }
  })
);


productRouter.post('/addreview/:id',expressAsyncHandler(async(req,res) =>{
    const { name ,review ,rating} =req.body;
    const newReview = new Review({
      name:name,
      review:review,
      rating:rating,
      product:req.params.id
    });
    const reviewlist =await newReview.save();
    if(reviewlist){
      res.status(200).send(reviewlist);
    }
    else{
      res.status(404).send({ message: 'fail To Add Your Review'});
    }
}));


productRouter.get('/getreview/:id',expressAsyncHandler(async(req,res)=>{
   const reviews = await Review.find({product:req.params.id});
   if(reviews){
     res.status(200).send(reviews);
   }
   else{
    res.status(404).send({ message: 'Review Not Found'});
   }
}));

productRouter.post('/comments',expressAsyncHandler(async(req,res) =>{
  const { name,comment}=req.body;
  const commentModel=new Comment({ name,comment});
  await commentModel.save();
  if(commentModel){
    res.status(200).send(commentModel);
  }
  else{
    res.status(404).send({ message: 'comment Not added'});
   }
}));

productRouter.post('/search',expressAsyncHandler(async(req,res) =>{
    const { key }=req.body;
    console.log(key);
    const products=await Product.find({$text:{ $search: key}});
    if(products && products.length!=0){
      res.status(200).send({products});
    }
    else{
      res.status(404).send({ message: 'Product Not Found' });      
    }
}));




export default productRouter;
