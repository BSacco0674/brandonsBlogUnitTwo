const express = require("express");
const Article = require("./../models/article");
const marked = require("marked"); //idk if we installed this
const router = express.Router();
// const createDomPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const dompurify = createDomPurify(new JSDOM().window);
const articlesCtrl = require("../controllers/articles");

router.get("/", isLoggedIn, articlesCtrl.index);
router.get("/new", isLoggedIn, articlesCtrl.new);
router.get("/:id/edit", isLoggedIn, articlesCtrl.edit);
router.get("/:id", isLoggedIn, articlesCtrl.show);
router.post("/", isLoggedIn, articlesCtrl.create);
router.delete("/:id", isLoggedIn, articlesCtrl.delete);
router.put("/:id", isLoggedIn, articlesCtrl.update);

// function saveArticleAndRedirect(path) {
//   console.log("thisisrunning");
//   return async (req, res) => {
//     let article = req.article;
//     article.title = req.body.title;
//     article.description = req.body.description;
//     article.markdown = req.body.markdown;
//     try {
//       await Article.save();
//       res.redirect(`/articles/${article.slug}`);
//     } catch (e) {
//       res.render(`articles/${path}`, {
//         article: article,
//         title: "Brandon's blog",
//       });
//     }
//   };
// }

function isLoggedIn(req, res, next) {
  console.log("areyourunning");
  if (req.isAuthenticated()) return next();
  res.redirect("/users");
}

module.exports = router;
