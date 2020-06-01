const Article = require("../models/article");

module.exports = {
  index,
  new: newArticle,
  edit,
  show,
  create,
  update,
  delete: deleteArticle,
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
  res.render("articles/edit", { article: article(), title: "Brandon's blog" });
}

async function show(req, res) {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article, title: "Brandon's blog" });
}

function create(req, res) {
  console.log("createfunction");
  req.body.user = req.user._id;
  const newArticle = new Article(req.body);
  newArticle.save(function (err) {
    if (err) return res.redirect("/articles/new");
    console.log(newArticle);
    res.redirect("/articles");
  });
}
// req.article = new Article();
// console.log("thisisrunning")
//   let article = req.article;
//   article.title = req.body.title;
//   article.description = req.body.description;
//   article.markdown = req.body.markdown;
//     console.log('thisrunning')
//     Article.create();
//     res.redirect(`/articles/${article.slug}`);
// };

async function update(req, res, next) {
  req.article = await Article.findById(req.params.id);
  return next();
}

async function deleteArticle(req, res) {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
}
