import express from "express"
import {createpost,getAllPost,getSinglePost,deletePostById,updatePostById} from "../controllers/postController.js"
import {validatePost} from "../middleware/validatePost.js"

const router = express.Router()


router.post("/",validatePost,createpost)
router.get("/",getAllPost)
router.get("/:id",getSinglePost)
router.delete("/:id",deletePostById)
router.put("/:id",updatePostById)

export default router;