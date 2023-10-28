const router = require("express").Router();
const { Article, RelatedArticle, Fact } = require("../models");

router.post("/check", async (req, res) => {
  const { title, headlines, source } = req.body;
  // check if articleExists
  let articleExists = await Article.findOne({
    where: {
      title: title,
    },
  });

  if (articleExists) {
    // fetch all the related articles
    const relatedArticles = await RelatedArticle.findAll({
      where: {
        articleId: articleExists?.id,
      },
      include: {
        model: Article,
        as: "article",
      },
      include: {
        model: Article,
        as: "relatedArticleAlias",
      },
    });
    if (relatedArticles.length >= 1) {
      let articleIds = [];
      relatedArticles.forEach((article) => {
        articleIds.push(article.relatedArticleAlias.id);
      });
      articleIds.push(articleExists.id);
      // find facts in the related articles + article
      let relatedArticlesFacts = [];
      for (let i = 0; i < articleIds.length; i++) {
        let facts = await Fact.findAll({
          where: {
            articleId: articleIds[i],
            verified: true,
          },
        });
        relatedArticlesFacts.push(facts);
      }

      // change the facts array to a single array
      relatedArticlesFacts = relatedArticlesFacts.flat();

      res.status(200).send({
        message: "Related articles found",
        article: articleExists,
        relatedArticles: relatedArticles,
        facts: relatedArticlesFacts,
      });

      // relatedArticles.forEach((article) => {
      //   relatedArticlesFacts.push(article.article.description);
      // });
    } else {
      let facts = await Fact.findAll({
        where: {
          articleId: articleExists.id,
          verified: true,
        },
      });
      res.status(200).send({
        message: "Related articles Not found",
        article: articleExists,
        relatedArticles: relatedArticles,
        facts: facts,
      });
    }
  } else {
    // create new article
    let article = await Article.create({
      title: title,
      description: headlines,
      source: source,
    });
    if (article) {
      res.status(200).send({ message: "Article created" });
    }
  }
});

// fetch all articles
router.get("/all", async (req, res) => {
  let articles = await Article.findAll();
  res.send(articles);
});

// Link related articles
router.put("/link", async (req, res) => {
  const { articleId, relatedArticleId } = req.body;
  // check if related article exists
  let relatedArticleExists = await RelatedArticle.findOne({
    where: {
      articleId: articleId,
      relatedArticleId: relatedArticleId,
    },
  });
  if (relatedArticleExists) {
    res.status(200).send({
      message: "Related article already exists",
    });
    return;
  }
  let relatedArticle = await RelatedArticle.create({
    articleId: articleId,
    relatedArticleId: relatedArticleId,
  });
  if (relatedArticle) {
    res.status(200).send({
      message: "Related article created",
    });
  } else {
    res.status(500).send({
      message: "Related article creation failed",
    });
  }
});

// add facts to article
router.post("/add-fact/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const { title, description, source, userId, verdict } = req.body;
  let article = await Article.findOne({
    where: {
      id: articleId,
    },
  });
  if (article) {
    // add fact
    const newFact = await Fact.create({
      title: title,
      description: description,
      source: source,
      articleId: articleId,
      userId: userId,
      verdict: verdict,
    });
    if (newFact) {
      res.status(200).send({
        message: "Fact added",
      });
    } else {
      res.status(500).send({
        message: "Fact addition failed",
      });
    }
  } else {
    res.status(500).send({
      message: "Fact addition failed. Could not find article",
    });
  }
});

module.exports = router;
