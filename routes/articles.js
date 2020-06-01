const express = require("express");
const Article = require("./../models/article");
const marked = require('marked') //idk if we installed this 
const router = express.Router();
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window )


router.get("/new", (req, res) => {
    res.render("aricles/new", { article: new Article() });
  });

router.get("/new/:id", async (req, res) => {
const article = await Article.findById(req.params.id)
  res.render("aricles/edit", { article: article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res, next) => {
 req.article = new Article()
 next()
}, saveArticleAndRedirect('new'))

router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
   }, saveArticleAndRedirect('edit'))
   

method="DELETE"
router.delete('/:id', async (req, res) =>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req, res) => { 
        let article = req.article
       article.title = req.body.title
       article.description = req.body.description
       article.markdown = req.body.markdown
      try {
        await article.save();
        res.redirect(`/articles/${article.slug}`);
      } catch (e) {
        res.render(`articles/${path}`, { article: article });
      }
    });

    }
}


module.exports = router;
