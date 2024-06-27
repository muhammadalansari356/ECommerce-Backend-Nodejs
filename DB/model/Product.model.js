// import mongoose, {model,Schema, Types} from "mongoose";

// const productSchema=new Schema({
//   customId: String,
//   name :{type: String, requeried : [true , "name is requeried"], trim:true,lowercase : true},
//   slug :{type: String, requeried : [true , "name is requeried"], trim:true,lowercase : true},
//   description: String , 
//   stock : {type: Number , default : 1, required: true},
//   price : {type: Number , default : 1, required: true},
//   discount : {type: Number , default : 0 },
//   finalPrice : {type: Number , default : 1, required: true},

//   colors:[String],
//   size:{
//     type:[String],
//     enum:['s','m','l','xl','xxl']
//   },

//   mainImage: { type: Object , required: true} ,
//   subImages: { type: [Object]} ,

//   categoryId :{ type: Types.ObjectId, ref:'Category',requeried : [true], },
//   subcategoryId :{ type: Types.ObjectId, ref:'Subcategory',requeried : [true], },
//   brandId :{ type: Types.ObjectId, ref:'Brand',requeried : [true], },

//   // image :{  type: Object, requeried: true},
//   createdBy :{ type: Types.ObjectId, ref:'User',requeried : [true], },
//   updatedBy :{ type: Types.ObjectId, ref:'User'},
//   isDeleted : { type : Boolean , default : false},
//   wishUserList : [{ type: Types.ObjectId , ref : 'User' }],

// },{
//   timetamps:true 
// })

// const productModel = mongoose.models.product || model('product',productSchema)
// export default productModel

// gpt file 

import mongoose, { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
  customId: String,
  name: { type: String, required: [true, "name is required"], trim: true, lowercase: true },
  slug: { type: String, required: [true, "slug is required"], trim: true, lowercase: true },
  description: String,
  stock: { type: Number, default: 1, required: true },
  price: { type: Number, default: 1, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, default: 1, required: true },
  colors: [String],
  size: {
    type: [String],
    enum: ['s', 'm', 'l', 'xl', 'xxl']
  },
  mainImage: { type: Object, required: true },
  subImages: { type: [Object] },
  categoryId: { type: Types.ObjectId, ref: 'Category', required: [true] },
  subcategoryId: { type: Types.ObjectId, ref: 'Subcategory', required: [true] },
  brandId: { type: Types.ObjectId, ref: 'Brand', required: [true] },
  createdBy: { type: Types.ObjectId, ref: 'User', required: [true] },
  updatedBy: { type: Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
  wishUserList: [{ type: Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const productModel = mongoose.models.Product || model('Product', productSchema);
export default productModel;
