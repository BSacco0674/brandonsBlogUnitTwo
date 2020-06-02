const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);
const articleSchema = new mongoose.Schema({
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
