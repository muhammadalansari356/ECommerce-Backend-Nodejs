// reviews.js
import reviewModel from '../../../../DB/model/Review.model.js';
import { asyncHandler } from '../../../utils/errorHandling.js';

export const getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await reviewModel.find();
  res.status(200).json({ reviews });
});


export const getReviewsByProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const reviews = await reviewModel.find({ productId });
  if (!reviews) {
    return next(new Error(`No reviews found for product with id ${productId}`, { status: 404 }));
  }
  res.status(200).json({ reviews });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const { userId, productId, rating, comment } = req.body;
  const review = await reviewModel.create({ userId, productId, rating, comment });
  res.status(201).json({ review });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
  if (!updatedReview) {
    return next(new Error(`Review with id ${reviewId} not found`, { status: 404 }));
  }
  res.status(200).json({ updatedReview });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const deletedReview = await reviewModel.findByIdAndDelete(reviewId);
  if (!deletedReview) {
    return next(new Error(`Review with id ${reviewId} not found`, { status: 404 }));
  }
  res.status(200).json({ message: "Review deleted successfully" });
});
