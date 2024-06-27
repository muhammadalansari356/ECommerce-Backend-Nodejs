import mongoose, {model,Schema, Types} from "mongoose";

const couponSchema=new Schema({
  name :{type: String, requeried : [true , "name is requeried"], unique:true, trim : true , lowercase : true},
  image :{  type: Object,},
  amount:{ type:Number, default:1,},
  expireDate :{type: Date , required: true},
  usedBy: [{type:Types.ObjectId, ref:"User"}],
  createdBy :{ type: Types.ObjectId, ref:'User',requeried : [true], },
  updatedBy :{ type: Types.ObjectId, ref:'User'},

},{
  timetamps:true 
})

const couponModel = mongoose.models.Coupon || model('Coupon',couponSchema)
export default couponModel