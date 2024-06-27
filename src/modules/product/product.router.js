import * as productController from './controller/product.js'
import {fileUpload, fileValidation} from '../../utils/multer.js'
 import {endPoint} from './product.endPoint.js' 
 import { auth } from "../../middleware/auth.js";
 import { validation } from '../../middleware/validation.js'
 import * as validators from "./product.validation.js";
import { Router } from "express";
const router = Router()

//step 2 after Product.model.js 

router.post ( '/', 
 validation(validators.headers , true),
auth (endPoint.create),
fileUpload(fileValidation.image).fields([
  {  name: 'mainImage' , maxCount : 1 },
  {  name: 'subImages' , maxCount : 5  },
]),
 validation(validators.createProduct),
productController.createProduct)

router.put ( '/:productId', 
auth (endPoint.update),
fileUpload(fileValidation.image).fields([
  {  name: 'mainImage' , maxCount : 1 },
  {  name: 'subImages' , maxCount : 5  },
]),
validation(validators.updateProduct),
productController.updateProduct )

router.get('/:productId', 
  productController.getProductById
);

router.get('/category/:categoryId/subcategory/:subcategoryId', 
  productController.getProductsByCategoryAndSubcategory
);


router.get('/',   
  productController.getProductsPagi);





  
export default router






// router.get('/', 
//   // auth(Object.values(roles)),
//       productController.getProduct
//   )


