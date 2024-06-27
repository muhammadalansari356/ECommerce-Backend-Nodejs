import subcategoryRouter from '../subcategory/subcategory.router.js'
import * as categoryController from './controller/category.js'
import * as validators from './category.validation.js'
import { validation } from '../../middleware/validation.js';
import {fileUpload , fileValidation} from '../../utils/multer.js'
import { Router } from "express";
import {auth, roles} from '../../middleware/auth.js';
import { endPoint } from './category.endPoint.js';


const router = Router({caseSensitive: true})

router.use('/:categoryId/subcategory',subcategoryRouter)

router.get('/', 
// auth(Object.values(roles)),
    categoryController.getCategory
)
router.post('/', 
    //auth([roles.Admin]),
    auth(endPoint.create),
    // authrized(endPoint.create),
    fileUpload (fileValidation.image).single("image"),
    validation(validators.createCategory),
    categoryController.createCategory
)
router.put('/:categoryId', 
    auth(),
    // authrized(endPoint.create),
    fileUpload (fileValidation.image).single("image"),
    validation(validators.updateCategory),
    categoryController.updateCategory
)



router.get('/', (req ,res)=>{
    res.status(200).json({message:"Category Module"})
})




export default router