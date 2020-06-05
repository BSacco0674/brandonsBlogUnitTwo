const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: String,
    like: Boolean,
  },
  {
    timestamps: true,
  }
);

const articleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Article", articleSchema);
