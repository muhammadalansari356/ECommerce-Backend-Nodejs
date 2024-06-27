import mongoose, {model,Schema, Types} from "mongoose";

const subcategorySchema=new Schema({
  customId :{type: String, requeried : [true , "name is requeried"], unique:true,},
  name :{type: String, requeried : [true , "name is requeried"], unique:true,lowercase : true},
  slug :{type: String,requeried : [true , "name is requeried"], lowercase : true},
  image :{  type: Object, requeried : [true , "name is requeried"], },
  categoryId :{  type: Types.ObjectId, ref:'Category', requeried : [true], },
  createdBy :{ type: Types.ObjectId, ref:'User',requeried : [true], },
  updatedBy :{ type: Types.ObjectId, ref:'User'},

},{
  timetamps:true 
})

const subcategoryModel = mongoose.models.Subcategory || model('Subcategory',subcategorySchema)
export default subcategoryModel