const express = require("express");
const Article = require("./../models/article");
const marked = require("marked"); //idk if we installed this
const router = express.Router();
const articlesCtrl = require("../controllers/articles");

router.get("/", isLoggedIn, articlesCtrl.index);
router.get("/new", isLoggedIn, articlesCtrl.new);
router.get("/:id/edit", isLoggedIn, articlesCtrl.edit);
router.get("/:id", isLoggedIn, articlesCtrl.show);
router.post("/", isLoggedIn, articlesCtrl.create);
router.post("/:id/comments", isLoggedIn, articlesCtrl.createComment);
router.delete("/:id", isLoggedIn, articlesCtrl.delete);
router.put("/:id", isLoggedIn, articlesCtrl.update);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
