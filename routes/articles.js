const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("aricles/new");
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  const aricle = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    await article.save();
    res.redirect(`/articles/1${article.id}`);
  } catch (e) {
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
