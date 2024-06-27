// import mongoose, {model,Schema, Types} from "mongoose";

// const cartSchema=new Schema({
//   userId :{ type: Types.ObjectId, ref:'User',requeried : [true], unique: true },

//   products: [
//     {
//     productId:{ type: Types.ObjectId, ref:'Product',requeried : [true] },
//     quantity: { type: Number, default : 1 ,requeried : [true] },
//   }
// ]
// },{
//   timetamps:true 
// })

// const cartModel = mongoose.models.Cart || model('Cart',cartSchema)
// export default cartModel


//gpt file for DB 
// DB file
import mongoose, { model, Schema, Types } from "mongoose";

const cartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: [true], unique: true },
  products: [
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: [true] },
      quantity: { type: Number, default: 1, required: [true] },
    }
  ]
}, {
  timestamps: true
});

const cartModel = mongoose.models.Cart || model('Cart', cartSchema);
export default cartModel;
