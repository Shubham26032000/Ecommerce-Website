import mongoose from 'mongoose';


const otpSchema =new mongoose.Schema({
    email:String,
    code:String,
    expireIn:Number
},{
    timestamps:true
});

let Otp =mongoose.model('otp',otpSchema);

export default Otp;