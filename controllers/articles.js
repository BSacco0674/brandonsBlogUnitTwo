const Article = require("../models/article");

module.exports = {
  index,
  new: newArticle,
  edit,
  show,
  create,
  update,
  delete: deleteArticle,
  createComment,
};

async function index(req, res) {
  const articles = await Article.find().sort({ createdAt: "desc" });
  console.log(req.user);
  res.render("articles/index", {
    articles: articles,
    title: "Brandon's blog",
    user: req.user,
  });
}

function newArticle(req, res) {
  console.log("pleaserun");
  res.render("articles/new", {
    title: "Brandon's Blog",
    user: req.user,
  });
}

function edit(req, res) {
  console.log("PLEASEEDIT");
  Article.findById(req.params.id, function (err, article) {
    res.render("articles/edit", {
      article,
      id: req.params.id,
      title: "Brandon's Blog",
      user: req.user,
    });
  });
}

async function show(req, res) {
  const article = await Article.findById(req.params.id);
  res.render("articles/show", {
    article: article,
    title: "Brandon's blog",
    user: req.user,
  });
}

function create(req, res) {
  console.log("createfunction");
  req.body.user = req.user._id;
  const newArticle = new Article(req.body);
  newArticle.save(function (err) {
    if (err) return res.redirect("/articles/new");
    res.redirect("/articles");
  });
}

async function update(req, res, next) {
  Article.findByIdAndUpdate(req.params.id, req.body, function (err, articles) {
    res.redirect("/articles/");
  });
}

async function deleteArticle(req, res) {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
}

function createComment(req, res) {
  Article.findById(req.params.id, function (err, article) {
    article.comments.push(req.body);
    article.save(function (err) {
      res.redirect(`/articles/${req.params.id}`);
    });
  });
}
