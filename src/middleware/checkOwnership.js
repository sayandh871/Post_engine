import {Post} from "../models/post.js"

export const checkOwnership = async (req, res, next) => {
    let id = req.params.id;
    let post = await Post.findById(id)
    

    if(!post){
       const err = new Error("post not found")
       err.status = 404;
       throw err;
    }

    req.post = post;

    if(post.author.equals(req.user._id)){
        return next();
    }else{
        const err = new Error("not authorized")
       err.status = 403;
       throw err;
    }

}