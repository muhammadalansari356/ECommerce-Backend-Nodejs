import * as cartController from "./controller/cart.js" ;
import {endPoint} from './cart.endPoint.js' 
import { auth } from "../../middleware/auth.js";
import { Router } from "express";
const router = Router()



router.post ( '/', 
    auth (endPoint.create),
    cartController.createCart)
    

    router.get('/', auth(endPoint.create), cartController.getCart);

export default router