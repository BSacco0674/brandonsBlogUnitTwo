const Post = require("../models/post");

module.exports = {
  index,
};

function index(req, res) {
  Post.find({}, function (err, posts) {
    if (err) return next(err);
    res.render("posts/index", { posts });
  });
}
