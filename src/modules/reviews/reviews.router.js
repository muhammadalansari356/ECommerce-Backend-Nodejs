// review.router.js
import * as reviewController from "../reviews/controller/review.js";
import { endPoint } from "./reviews.endPoint.js";
import { validation } from '../../middleware/validation.js';
import * as validators from "./reviews.validation.js";
import { auth } from "../../middleware/auth.js";
import { Router } from "express";
const router = Router();

router.get('/', 
  auth(endPoint.getAllReviews),
  reviewController.getAllReviews);

  router.get('/product/:productId',
    auth(endPoint.getReviewsByProduct),
    validation(validators.getReviewsByProduct),
    reviewController.getReviewsByProduct);
  
router.post('/', 
  auth(endPoint.createReview),
  validation(validators.createReview),
  reviewController.createReview);

router.put('/:reviewId', 
  auth(endPoint.updateReview),
  validation(validators.updateReview),
  reviewController.updateReview);

router.delete('/:reviewId', 
  auth(endPoint.deleteReview),
  validation(validators.deleteReview),
  reviewController.deleteReview);



export default router;
