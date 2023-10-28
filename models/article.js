module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
  });
  Article.associate = function (models) {
    Article.hasMany(models.RelatedArticle, {
      foreignKey: "articleId",
      as: "relatedArticles",
    });
  };
  return Article;
};
