import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {type : String, required: true},
    content : {type : String , required : true},
    category : {type : String },
    tags : {type : [String]},
    author : {type : mongoose.Schema.Types.ObjectId, ref : "User" }

},{timestamps : true})

export const Post = mongoose.model("Post",postSchema);