// step 3 
import subcategoryModel  from '../../../../DB/model/Subcategory.model.js'
import brandModel from '../../../../DB/model/Brand.model.js'
import slugify from 'slugify';
import cloudinary from '../../../utils/cloudinary.js';
import { nanoid } from 'nanoid';
import { asyncHandler } from '../../../utils/errorHandling.js';
import productModel from '../../../../DB/model/Product.model.js';

//Create New Product
  export const createProduct = asyncHandler(async (req , res , next) => {
  const {name , categoryId , subcategoryId , brandId , price , discount} = req.body ;

  const checkCategory =await subcategoryModel.findOne ({_id : subcategoryId , categoryId })      
      
  if (! checkCategory) {
        return next (new Error ('in-valid Category or Subcategory ID ', {cause : 400}))
      }
      
      if (! await brandModel.findOne ({_id : brandId })) {
        return next (new Error ('in-valid Brand ID ' , {cause : 400}))
       }

       req.body.slug = slugify (name ,{
            replacement : '-',
            trim : true ,
            lower: true, 
            
            });

            req.body.finalPrice = Number.parseFloat(price - ( price * ((discount || 0) / 100 ))).toFixed(2) 


            req.body.customId = nanoid()
          const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
            { folder: `${process.env.APP_NAME}/product/${req.body.customId}`})
            req.body.mainImage = {secure_url , public_id}



        if (req.files.subImages) {
          req.body.subImages = []
          for (const file of req.files.subImages) {
            const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,
              { folder: `${process.env.APP_NAME}/product/${req.body.customId}/subImages`})

              req.body.subImages.push({secure_url, public_id})
          }
        }


        req.body.createdBy = req.user._id
          const product =await productModel.create(req.body)

          if (!product) {
            return next (new Erroe ("fail to create this product " , {cause : 400}) )
          }
         return res.status(201).json({message:'Done',product})

      })

//update product
      export const updateProduct = asyncHandler(async (req , res , next) => {                                                                                                     

  //check product exist
const { productId } = req.params;
const product = await productModel.findById(productId) ;
if (! product) {
  return next (new Error ('in-valid product ID ', {cause : 400}))

}

//destruct main fields
  const {name , categoryId , subcategoryId , brandId , price , discount} = req.body ;


  //check category and brand 
    if (categoryId && subcategoryId) {
      if (!await subcategoryModel.findOne ({_id : subcategoryId , categoryId })) {
            return next (new Error ('in-valid Category or Subcategory ID ', {cause : 400}))
          }
    }
      if (brandId) {
        if (! await brandModel.findOne ({_id : brandId })) {
          return next (new Error ('in-valid Brand ID ' , {cause : 400}))
         }
      }
      
      //update slug
        if (name) {
          req.body.slug = slugify (name ,{
            replacement : '-',
            trim : true ,
            lower: true, 
            
            })
        }
                                                                                                                                                                         

        //update price

        if (price && discount) {
          req.body.finalPrice = Number.parseFloat(price - ( price * ((discount || 0) / 100 ))).toFixed(2) 

        }else if (price) {
          req.body.finalPrice = Number.parseFloat(price - ( price * ((product.discount || 0) / 100 ))).toFixed(2) 

        } else if (discount) {
          req.body.finalPrice = Number.parseFloat(product.price - ( product.price * ((discount) / 100 ))).toFixed(2) 

        }


        if (req.files?.mainImage?.length) {
          const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
            { folder: `${process.env.APP_NAME}/product/${product.customId}`})
            await cloudinary.uploader.destroy(product.mainImage.public_id)
            req.body.mainImage = {secure_url , public_id}

        }
         


        if (req.files?.subImages?.length) {
          req.body.subImages = []
          for (const file of req.files.subImages) {
            const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,
              { folder: `${process.env.APP_NAME}/product/${req.body.customId}/subImages`})

              req.body.subImages.push({secure_url, public_id})
          }
        }


        req.body.updatedBy = req.user._id
         await productModel.updateOne({_id : product._id},req.body)
         return res.status(200).json({message:'Done'})

      })


//getProductById
      export const getProductById = asyncHandler(async (req, res, next) => {
        const { productId } = req.params;
      
        const product = await productModel.findById(productId);
        if (!product) {
          return next(new Error('Invalid product ID', { cause: 400 }));
        }
      
        return res.status(200).json({ message: 'Done', productName: product.name, product });
      });

//getProductsByCategoryAndSubcategory
      export const getProductsByCategoryAndSubcategory = asyncHandler(async (req, res, next) => {
        const { categoryId, subcategoryId } = req.params;
      
        const products = await productModel.find({ categoryId, subcategoryId });
        if (!products.length) {
          return next(new Error('No products found for the given category and subcategory', { cause: 404 }));
        }
      
        return res.status(200).json({ message: 'Done', products });
      });

      
      // Example: Pagination
      export const getProductsPagi = asyncHandler(async (req, res, next) => {
        let { page = 1, limit = 5 } = req.query;
      
        page = parseInt(page);
        limit = parseInt(limit);
      
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 5;
      
        const skip = (page - 1) * limit;
        const totalProducts = await productModel.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
      
        if (page > totalPages) {
          return next(new Error('Page not found', { cause: 404 }));
        }
      
        const products = await productModel.find().skip(skip).limit(limit);
      
        return res.status(200).json({
          message: 'Done',
          page,
          limit,
          totalPages,
          totalProducts,
          products
        });
      });



      
// export const getProduct = asyncHandler(async (req , res , next) => {                                                                                                     
 
//     const product = await productModel.find()
   
      
//     return res.status(200).json({message:'Done',product})

// })


