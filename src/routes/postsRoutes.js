import express from "express";
import {
  createpost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import { validate } from "../middleware/validatePost.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validations/postValidation.js";
import { protect } from "../middleware/authMiddleware.js";
import {checkOwnership} from "../middleware/checkOwnership.js"

const router = express.Router();

router.post("/", protect, validate(createPostSchema), asyncWrapper(createpost));
router.get("/", asyncWrapper(getAllPost));
router.get("/:id", asyncWrapper(getSinglePost));
router.delete("/:id", protect, asyncWrapper(checkOwnership), asyncWrapper(deletePost));
router.put(
  "/:id",
  protect,
  asyncWrapper(checkOwnership),
  validate(updatePostSchema),
  asyncWrapper(updatePost),
);

export default router;
