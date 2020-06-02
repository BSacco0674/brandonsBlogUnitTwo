const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const Schema = mongoose.Schema;
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
  // slug: {
  //     type: String,
  //     required: true,
  //     unique: true
  // },
  // sanitizedHtml: {
  //     type: String,
  //     required: true
  // }
});


module.exports = mongoose.model("Article", articleSchema);
