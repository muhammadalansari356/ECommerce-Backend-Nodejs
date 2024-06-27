import mongoose, {model,Schema, Types} from "mongoose";

const categorySchema=new Schema({
  name :{type: String, requeried : [true , "name is requeried"],  unique:true,lowercase : true },
  slug :{  type: String,  requeried : [true , "name is requeried"], lowercase : true },
  image :{  type: Object,requeried : [true , "name is requeried"],  },
  createdBy :{ type: Types.ObjectId, ref:'User',requeried : [true], },
  updatedBy :{ type: Types.ObjectId, ref:'User'},

},{
  toJSON:{virtuals: true},
  toObject:{virtuals: true},

  timetamps:true ,
})

categorySchema.virtual('subcategory',{
  localField:'_id',
  foreignField:'categoryId',
  ref:'Subcategory',

}

)
const categoryModel = mongoose.models.Category || model('Category',categorySchema)
export default categoryModel