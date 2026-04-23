import {Post} from "../models/post.js"

export async function createpost(req,res){
    try{
        const post = new Post(req.body);
        const savedPost = await post.save();

        res.status(201).send(savedPost);
    }catch(err){
        res.status(500).send("error creating post");
    }
}

export function getAllPost(req,res,next){
    res.send(posts);
    
}

export function getSinglePost(req, res){
    let id = req.params.id;
    let foundPost = null
    for (let post of posts){
        if(post.id == id){
           foundPost = post;
           break;
        }
    }
    if(foundPost){
        res.send(foundPost);
    }else{
        res.status(404).send("post not found")
    }
}

export function deletePostById(req, res){
    let id = Number(req.params.id)

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            posts.splice(i, 1);
            return res.status(200).send("post deleted successfully")
        }
    }
    res.status(404).send("post not found");
}

export function updatePostById(req, res){
    let id = Number(req.params.id)
    let {title,content} = req.body;

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            if(title){
                posts[i].title = title
            }
            if(content){
                posts[i].content = content
            }
            return res.status(200).send(posts[i])
        }
        
    }
    res.status(404).send("post not found");
}