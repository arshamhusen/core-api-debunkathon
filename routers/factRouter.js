const router = require("express").Router();
const { Article, RelatedArticle, Fact } = require("../models");

router.put("/verify/:id", async (req, res) => {
  const { id } = req.params;

  // check if fact exists
  const fact = await Fact.findOne({
    where: {
      id: id,
    },
  });
  if (!fact) {
    return res.status(400).send({
      message: "Fact not found",
    });
  }
  const verifyFact = await Fact.update(
    {
      verified: true,
      verifiedBy: 1,
      verifiedAt: new Date(),
    },
    {
      where: {
        id: id,
      },
    }
  );

  if (!verifyFact) {
    return res.status(400).send({
      message: "Fact not found",
    });
  }
  res.status(200).send({
    message: "Fact verified",
    verifyFact,
  });
});

// fetch all facts
router.get("/", async (req, res) => {
  const facts = await Fact.findAll();
  res.status(200).send({
    message: "Facts fetched",
    facts,
  });
});

module.exports = router;
