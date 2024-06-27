// review.validation.js
import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const getReviewsByProduct = joi.object({
  productId: generalFields.id.required()
});


export const createReview = joi.object({
  userId: generalFields.id.required(),
  productId: generalFields.id.required(),
  rating: joi.number().integer().min(1).max(5).required(),
  comment: joi.string().required()
});

export const updateReview = joi.object({
  reviewId: generalFields.id,
  rating: joi.number().integer().min(1).max(5),
  comment: joi.string()
});

export const deleteReview = joi.object({
  reviewId: generalFields.id.required()
});
