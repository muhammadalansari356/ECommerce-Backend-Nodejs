// import { required, string } from "joi";
import mongoose, {model,Schema, Types} from "mongoose";

const orderSchema=new Schema({
     
  address : { type : String , required : true } ,
  phone : [{ type : String , required : true }],
  note : {type: String },
  userId :{ type: Types.ObjectId, ref:'User',requeried : [true]},
  updatedBy :{ type: Types.ObjectId, ref:'User'},

  products : [{
    
    name: {type: String , required : true  },
    productId :{ type: Types.ObjectId, ref:'Product',requeried : [true] },
    quantity : { type: Number, default : 1 ,requeried : [true] },
    unitPrice : {type : Number , default : 1 , required : true },
    finalPrice : {type : Number , default : 1 , required : true }, // for each product 
  }],                                                                                                                                      
  couponId : {type : Types.ObjectId , ref:"Coupon" },
  subtotal : {type : Number , default : 1 , required : true }, // for all products ( in bill)
  finalPrice : {type : Number , default : 1 , required : true }, // for all products after discount and coupon (in bill)
  paymentType : {
    type: String , 
    default : 'cash',
    enum: ['cash' , 'card'],
  },

  status : {
    type : String , 
    default: 'placed',                                                                                                                                                     
    enum : ['waitPayment' , 'placed' , "canceled" , "rejected" , "onWay" , "delivered"]
  },

  reason : { type : String }
},{
  timetamps:true 
})

const orderModel = mongoose.models.Order || model('Order', orderSchema)
export default orderModel