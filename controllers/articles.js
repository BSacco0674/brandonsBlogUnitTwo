const Article = require("../models/article");

module.exports = {
  index,
  new: newArticle,
};

function index(req, res) {
  Article.find({}, function (err, articles) {
    if (err) return next(err);
    res.render("articles/index", { articles });
  });
}

function newArticle(req, res) {
  res.render("articles/new", { article: new Article(), title: "Brandon's Blog" });
};
