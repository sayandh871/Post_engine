import { Post } from "../models/post.js";

export async function createpost(req, res) {
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    category : req.body.category,
    tags : req.body.tags,
    author : req.user._id

  });
  const savedPost = await post.save();

  res.status(201).send(savedPost);
}

export async function getAllPost(req, res, next) {
  const posts = await Post.find();
  res.status(200).send(posts);
}

export async function getSinglePost(req, res, next) {
  let id = req.params.id;
  const foundPost = await Post.findById(id);
  
  if (!foundPost) {
    const err = new Error("post not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).send(foundPost);
}

export async function deletePost(req, res, next) {
  const post = req.post;

  await post.deleteOne();

  res.status(200).send("Post deleted successfully");
}

export async function updatePost(req, res, next) {

  let post = req.post;

  if(req.body.title) post.title = req.body.title
  if(req.body.content) post.content = req.body.content
  if(req.body.category) post.category = req.body.category
  if(req.body.tags) post.tags = req.body.tags

  await post.save();

  return res.status(200).send(post);
}
