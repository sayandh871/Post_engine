import joi from "joi";

const allowedCategories = ['tech', 'ai', 'business', 'lifestyle']

const createPostSchema = joi.object({
  title: joi.string().min(6).max(100).trim().required(),
  content: joi.string().min(50).max(5000).trim().required(),
  category: joi.string().valid(...allowedCategories).required(),
  tags: joi.array().items(joi.string().min(2).max(20).trim()).max(10),
})
.unknown(false)

const updatePostSchema = joi.object({
  title: joi.string().min(6).max(50).trim(),
  content: joi.string().min(50).trim(),
  category: joi.string().valid(...allowedCategories),
  tags: joi.array().items(joi.string().min(2).max(20).trim()).max(10),
})
.min(1)
.unknown(false)

export {createPostSchema, updatePostSchema}