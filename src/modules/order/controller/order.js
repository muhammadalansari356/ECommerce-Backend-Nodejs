import couponModel from '../../../../DB/model/Coupon.model.js'
import productModel from '../../../../DB/model/Product.model.js'
import orderModel from '../../../../DB/model/order.model.js';
import cartModel from '../../../../DB/model/Cart.model.js'
import { asyncHandler } from '../../../utils/errorHandling.js';

export const createOrder = asyncHandler (async(req, res , next) => {

  const { address, phone, note , couponName , paymentType} = req.body;

    if (!req.body.products) {
      const cart = await cartModel.findOne({userId: req.user._id})

      if (!cart?.products?.length) {
        return next(new Error('empty cart', { cause: 400 }))
    
      }          
      req.body.isCart= true                                                                                                                                                         
    req.body.products = cart.products
    }



if (couponName) {
  
  const coupon = await couponModel.findOne({ name: couponName.toLowerCase() , usedBy : {$nin: req.user._id}})

  if (!coupon || coupon.expireDate.getTime() < Date.now()) {
  return next(new Error('In-valid or expired coupon', { cause: 404 }))
  }
  req.body.coupon = coupon ; 
}


 const productIds =[];
const finalProductList = [];
let subtotal = 0;
for (let product of req.body.products ) {
  
  const checkedProduct = await productModel.findOne({

    _id : product.productId ,
    stock : {$gte : product.quantity} , 
    isDeleted: false ,
  })

  
if (! checkedProduct) {
  return next(new Error(`In-valid product with id ${product.productId} ` , { cause: 400 }))

}

if ( req.body.isCart) {
  product = product.toObject()

}

productIds.push(product.productId);
product.name = checkedProduct.name;
product.unitPrice = checkedProduct.finalPrice;
product.finalPrice =  product.quantity * checkedProduct.finalPrice.toFixed(2);
finalProductList.push(product)
subtotal += product.finalPrice
}

const order = await orderModel.create ({
    userId: req.user._id ,
    address,
    phone,
    note,
    products: finalProductList,
    couponId :req.body.coupon?._id,
    subtotal,                                                                                                                                                          
    finalPrice:  subtotal - (subtotal * ((req.body.coupon?.amount || 0 ) / 100)).toFixed(2),
    paymentType,
    status: paymentType == "card" ? "waitPayment" : "placed",
  


})



//decrease product stock 
for (const product of req.body.products ) {
await productModel.updateOne({_id: product.productId} , {$inc : {stock : -parseInt(product.quantity)}})                                                                                                                                      

}

// push user id in copoun usedBy
if (req.body.coupon) {
  await couponModel.updateOne({_id: req.body.coupon._id} , {$addToSet: {usedBy: req.user._id}})
}
 //clear items from cart after order

 if ( req.body.isCart) {
  await cartModel.updateOne({userId: req.user._id}, { products:[] } )

}else{

  await cartModel.updateOne({userId: req.user._id}, {
      $pull: {
        products: { 
          productId: { $in: productIds }
    
          }
      }
    })

}


// }else{
//  
//  }


return res.status(201).json({ message : "Done" , order})

})


export const cancelOrder = asyncHandler (async(req, res , next) => {

  const {reason} = req.body;
  const {orderId} = req.params;

  const order = await orderModel.findOne({ _id: orderId , userId: req.user._id})

if (!order) {
  return next(new Error(` In-valid order ID`, { cause: 404 })) 

}
  if ((order?.status != "placed" && order.paymentType =="cash") || (order?.status != "waitPayment" && order.paymentType =="card")) {
    return next(new Error(` Cannot cancel your order after it been changed to ${order.status}`, { cause: 400 }))
  }

 const cancelOrder =  await orderModel.updateOne({_id: order._id}  , {status : 'canceled' , reason , updatedBy: req.user._id} )

 if (!cancelOrder.matchedCount) {
  return next(new Error(` Failed to cancel your order`, { cause: 400 }))

 }

//decrease product stock 
for (const product of order.products ) {
await productModel.updateOne({_id: product.productId} , {$inc : {stock : parseInt(product.quantity)}})                                                                                                                                      

}

// push user id in copoun usedBy
if (order.couponId) {
  await couponModel.updateOne({_id: order.couponId} , {$pull: {usedBy: req.user._id}})
}


return res.status(200).json({ message : "Done"})

})



export const updateUserStatusByAdmin = asyncHandler (async(req, res , next) => {

  const {status} = req.body;
  const {orderId} = req.params;

  const order = await orderModel.findOne({ _id: orderId})

if (!order) {
  return next(new Error(` In-valid order ID`, { cause: 404 })) 

}

 const cancelOrder =  await orderModel.updateOne({_id: order._id}  , {status , updatedBy: req.user._id} )

 if (!cancelOrder.matchedCount) {
  return next(new Error(` Failed to update your order`, { cause: 400 }))
 }

return res.status(200).json({ message : "Done"})

})


export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find().populate('userId', 'username email'); // Populate userId with selected fields

  res.status(200).json({ orders });
});