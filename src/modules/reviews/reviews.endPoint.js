// reviews.endpoint.js
import { roles } from "../../middleware/auth.js";

export const endPoint = {
  getAllReviews: [roles.Admin],
  getReviewsByProduct: [roles.User, roles.Admin],
  createReview: [roles.User],
  updateReview: [roles.User],
  deleteReview: [roles.Admin]
};
