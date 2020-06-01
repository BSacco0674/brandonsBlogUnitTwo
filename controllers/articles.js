const Article = require("../models/article");

module.exports = {
  index,
};

function index(req, res) {
  Article.find({}, function (err, articles) {
    if (err) return next(err);
    res.render("articles/index", { articles });
  });
}
