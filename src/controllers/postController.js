import { Post } from "../models/post.js";

export async function createpost(req, res, next) {
  const post = new Post(req.body);
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

export async function deletePostById(req, res, next) {
  let id = req.params.id;
  let deletePost = await Post.findByIdAndDelete(id);

  if (!deletePost) {
    const err = new Error("post not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).send("Post deleted successfully");
}

export async function updatePostById(req, res, next) {
  let id = req.params.id;
  let updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedPost) {
    const err = new Error("post not found");
    err.status = 404;
    return next(err);
  }

  return res.status(200).send(updatedPost);
}
