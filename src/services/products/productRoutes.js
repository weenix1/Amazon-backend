import { Router } from "express";

import productsHandler from "./handlers.js";
import reviews from "../reviews/handlers.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const router = Router();

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Amazon-backend",
  },
});

router.get("/", productsHandler.getAll);

router.post("/", productsHandler.createUser);
router.post(
  "/uploadCloudinary",
  multer({ storage: cloudinaryStorage }).single("picture"),
  productsHandler.createUserCloud
);

router
  .route("/:id")
  .get(productsHandler.getById)
  .put(productsHandler.updateUserById)
  .delete(productsHandler.deleteUserById);

router.put(
  "/:id/imageCover",
  multer({ storage: cloudinaryStorage }).single("picture"),
  productsHandler.updateUserByIdImage
);

router
  .route("/:id/reviews")
  .get(reviews.getReviews)
  .post(reviews.postNewReview);

router
  .route("/:id/reviews/:reviewId")
  .put(reviews.updateReviewById)
  .delete(reviews.deleteReviewById);

export default router;
