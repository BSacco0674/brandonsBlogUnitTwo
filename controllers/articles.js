const Article = require("../models/article");

module.exports = {
  index,
  new: newArticle,
  edit,
  show,
  create,
  update,
  delete: deleteArticle
};

async function index(req, res) {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles, title: "Brandon's blog" });
}

function newArticle(req, res) {
  res.render("articles/new", {
    article: new Article(),
    title: "Brandon's Blog",
  });
}

async function edit(req, res) {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article() });
}


async  function show(req, res) {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
};

async function create (req, res, next) {
  req.article = new Article();
  next();
}

async function update(req, res, next) {
  req.article = await Article.findById(req.params.id);
  next();
}

async function deleteArticle(req, res) {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
};