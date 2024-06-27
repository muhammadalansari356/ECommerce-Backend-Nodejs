import * as brandController from './controller/brand.js'
import * as validators from './brand.validation.js'
import { validation } from '../../middleware/validation.js';
import {fileUpload , fileValidation} from '../../utils/multer.js'
import { Router } from "express";
import {auth} from '../../middleware/auth.js';
import { endPoint } from './brand.endPoint.js';

const router = Router()


router.get('/', 
    
    brandController.getBrand
)
router.post('/', 
    auth(endPoint.create),
    fileUpload (fileValidation.image).single("image"),
    validation(validators.createBrand),
    brandController.createBrand
)
router.put('/:brandId',
    auth(endPoint.update),
    fileUpload (fileValidation.image).single("image"),
    validation(validators.updateBrand),
    brandController.updateBrand
)



router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})




export default router