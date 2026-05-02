import express from "express";
import {
  createpost,
  getAllPost,
  getSinglePost,
  deletePostById,
  updatePostById,
} from "../controllers/postController.js";
import { validate } from "../middleware/validatePost.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validations/postValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, validate(createPostSchema), asyncWrapper(createpost));
router.get("/", asyncWrapper(getAllPost));
router.get("/:id", asyncWrapper(getSinglePost));
router.delete("/:id", protect, asyncWrapper(deletePostById));
router.put(
  "/:id",
  protect,
  validate(updatePostSchema),
  asyncWrapper(updatePostById),
);

export default router;
