import * as orderController from "./controller/order.js"
import  {endPoint} from "./order.endPoint.js"
import { validation } from '../../middleware/validation.js'
import * as validators from "./order.validation.js"
import {auth} from "../../middleware/auth.js"
import { Router } from "express";
const router = Router()




router.post('/', 
  auth(endPoint.create),
  validation(validators.createOrder),
  orderController.createOrder )


  router.patch('/:orderId', 
    auth(endPoint.cancelOrder),
    validation(validators.cancelOrder),
    orderController.cancelOrder )
  
  
    router.patch('/:orderId/Admin', 
      auth(endPoint.updateUserStatusByAdmin),
      validation(validators.updateUserStatusByAdmin),
      orderController.updateUserStatusByAdmin )
    

      router.get('/', 
        auth(endPoint.getAllOrders), // Add authorization middleware if required
        orderController.getAllOrders);

export default router