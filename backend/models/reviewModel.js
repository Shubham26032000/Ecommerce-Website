import mongoose from 'mongoose';

const reviewSchema =new mongoose.Schema({
   name:{
       required:true,
       type:String
   },
   review:{
       required:true,
       type:String,
   },
   rating:{
       required:true,
       type:Number
   },
   product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
},
},{
    timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;