const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: String,
    like: Boolean,
    user: String,
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
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Article", articleSchema);
