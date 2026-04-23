export function validatePost(req,res,next){

    let {title,content} = req.body;
    if(!title){
        return res.status(400).send("title required")
    }
    if(!content){
        return res.status(400).send("content required")

    }
    next();
}