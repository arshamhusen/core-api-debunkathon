"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RelatedArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RelatedArticle.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
      RelatedArticle.belongsTo(models.Article, {
        foreignKey: "relatedArticleId",
        as: "relatedArticleAlias",
      });
    }
  }
  RelatedArticle.init(
    {
      articleId: DataTypes.INTEGER,
      relatedArticleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RelatedArticle",
    }
  );
  return RelatedArticle;
};
