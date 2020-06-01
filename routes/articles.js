const express = require("express");
const Article = require("./../models/article");
const marked = require("marked"); //idk if we installed this
const router = express.Router();
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const articlesCtrl = require("../controllers/articles");

router.get("/", isLoggedIn, articlesCtrl.index);
router.get("/new", isLoggedIn, articlesCtrl.new);
router.get("/new/:id", isLoggedIn, articlesCtrl.edit);
router.get("/:slug", isLoggedIn, articlesCtrl.show);
router.post(
  "/",
  isLoggedIn,
  articlesCtrl.create,
  saveArticleAndRedirect("new")
);
router.put(
  "/:id",
  isLoggedIn,
  articlesCtrl.update,
  saveArticleAndRedirect("edit")
);
router.delete("/:id", isLoggedIn, articlesCtrl.delete);

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users");
}

module.exports = router;
