import express from "express"
import {createpost,getAllPost,getSinglePost,deletePostById,updatePostById} from "../controllers/postController.js"
import {validatePost} from "../middleware/validatePost.js"
import asyncWrapper from "../middleware/asyncWrapper.js"

const router = express.Router()


router.post("/",validatePost, asyncWrapper(createpost))
router.get("/", asyncWrapper(getAllPost))
router.get("/:id", asyncWrapper(getSinglePost))
router.delete("/:id", asyncWrapper(deletePostById))
router.put("/:id", asyncWrapper(updatePostById))

export default router;