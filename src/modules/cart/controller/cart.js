import productModel from "../../../../DB/model/Product.model.js";
import cartModel from "../../../../DB/model/Cart.model.js";

import { asyncHandler } from "../../../utils/errorHandling.js";



export const createCart =  async (req, res , next) => {

                                                                                                                                                                                                                                                                                                                               
  const { productId , quantity} = req.body ;

  const product = await productModel.findById(productId)

  if (! product) {
    return next(new Error ('invalid Product ID' ,{case : 400} ))
  }

  if (product.stock < quantity || product.isDeleted) {
    await productModel.updateOne({ _id: productId } , { $addToSet: { wishUserList: req.user._id}})
    return next(new Error (`invalid Product quantity max available is ${product.stock}` ,{case : 400} ))

  }


  const cart = await cartModel.findOne({ userId: req.user._id})

  if (!cart) {
    const newCart = await cartModel.create({
      userId: req.user._id,
      products: [{productId,quantity}]
    })
    return res.status(201).json({message: "Done" , cart:newCart})

  }


  // update old item 
  let matchProduct = false
for (let i = 0; i < cart.products.length; i++) {

  if (cart.products[i].productId.toString() == productId) {
    cart.products[i].quantity = quantity
    matchProduct = true
    break;
  } 

}
// add new item 
if (!matchProduct) {
  cart.products.push({productId , quantity})
}

await cart.save()

return res.status(200).json({message: "Done" , cart})




}



export const getCart = async (req, res, next) => {
  try {
    const cart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Success', cart });
  } catch (error) {
    next(error);
  }
};
