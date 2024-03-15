import { Router } from "express";
import { postReview, getReviews, getAllReviews } from "../controllers/review.controller.js";
const router = Router();

router.route("/review").post(postReview);
router.route("/reviews/:id").get(getReviews);
router.route("/placeReview/:id").get(getAllReviews);
export default router;