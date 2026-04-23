import {Post} from "../models/post.js"

export async function createpost(req,res){
    try{
        const post = new Post(req.body);
        const savedPost = await post.save();

        res.status(201).send(savedPost);
    }catch(err){
        res.status(500).send({message : "error creating post", error : err});
    }
}

export async function getAllPost(req,res){
    try{
        const posts = await Post.find();
        res.status(200).send(posts)

    }catch(err){
        res.status(500).send({message : "error fetching posts", error: err})
    }
    
}

export async function getSinglePost(req, res){
    let id = req.params.id;
    try{
        const foundPost = await Post.findById(id)
        if(foundPost){
            return res.status(200).send(foundPost)
        }else{
            return res.status(404).send("post not found")
        }

    }catch(err){
        res.status(500).send({message:"error fetching post",error:err})
    }
}

export async function deletePostById(req, res){
    let id = req.params.id

   try{
    let deletePost = await Post.findByIdAndDelete(id)
    if(deletePost){
        return res.status(200).send("Post deleted successfully")
    }else{
        return res.status(404).send("post not found");
    }

   }catch(err){
    res.status(500).send({message:"error deleting the post", error:err})
   }
}

export async function updatePostById(req, res){
    let id = req.params.id
    
    try{
        let updatedPost = await Post.findByIdAndUpdate(id, req.body, {new:true})
        if(updatedPost){
            return res.status(200).send(updatedPost);
        }else{
            return res.status(404).send("post not found");
        }
    }catch(err){
        res.status(500).send({message:"error updating post",error:err})
    }
}