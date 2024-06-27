// reviews.model.js
import mongoose, { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  productId: { type: Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.models.Review || model('Review', reviewSchema);
export default reviewModel;
