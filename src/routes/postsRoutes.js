import express from "express"
import {createpost,getAllPost,getSinglePost,deletePostById,updatePostById} from "../controllers/postController.js"
import {validate} from "../middleware/validatePost.js"
import asyncWrapper from "../middleware/asyncWrapper.js"
import { createPostSchema, updatePostSchema } from "../validations/postValidation.js"

const router = express.Router()


router.post("/",validate(createPostSchema), asyncWrapper(createpost))
router.get("/", asyncWrapper(getAllPost))
router.get("/:id", asyncWrapper(getSinglePost))
router.delete("/:id", asyncWrapper(deletePostById))
router.put("/:id", validate(updatePostSchema), asyncWrapper(updatePostById))

export default router;