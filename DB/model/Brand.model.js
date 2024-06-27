import mongoose, {model,Schema, Types} from "mongoose";

const brandSchema=new Schema({
  name :{type: String, requeried : [true , "name is requeried"], unique:true,lowercase : true},
  image :{  type: Object, requeried: true},
  createdBy :{ type: Types.ObjectId, ref:'User',requeried : [true], },
  updatedBy :{ type: Types.ObjectId, ref:'User'}, 

},{
  timetamps:true 
})

const brandModel = mongoose.models.Brand || model('Brand',brandSchema)
export default brandModel