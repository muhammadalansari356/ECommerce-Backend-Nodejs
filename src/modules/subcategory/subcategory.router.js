import subcategoryModel from '../../../DB/model/Subcategory.model.js';
import categoryModel from '../../../DB/model/Category.model.js';

import * as subcategoryController from './controller/subcategory.js'
import * as validators from './subcategory.validation.js'
import { validation } from '../../middleware/validation.js';
import {fileUpload , fileValidation} from '../../utils/multer.js'
import { Router } from "express";
import { auth } from '../../middleware/auth.js';
import { endPoint } from './subcategory.endPoint.js';
import { asyncHandler } from '../../utils/errorHandling.js';

const router = Router( {mergeParams:true , caseSensitive: true})

// router.get('/category/:categoryId/subcategories', 
    
//     subcategoryController.getSubcategoriesByCategoryId
// )


router.post('/', 
auth(endPoint.create),

     fileUpload (fileValidation.image).single("image"),
    validation(validators.createSubcategory),
    subcategoryController.createSubcategory
)
router.put('/:subcategoryId', 
auth(endPoint.update),

    fileUpload (fileValidation.image).single("image"),
    validation(validators.updateSubcategory),
    subcategoryController.updateSubcategory
)


// router.get('/category/:categoryId/subcategories', subcategoryController.getSubcategoriesByCategoryId);

router.get('/', asyncHandler(async (req ,res)=>{

  const { categoryId } = req.params;

const category = await categoryModel.findById(categoryId);
if (!category) {
  return next(new Error(`Invalid category Id`, { cause: 400 }));
}

const subcategories = await subcategoryModel.find({ categoryId });

  res.status(200).json({message:"subcategory Module"  , subcategories 
  })
}))




export default router