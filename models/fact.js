"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fact.hasOne(models.User, {
        foreignKey: "userId",
      });
      Fact.hasOne(models.User, {
        foreignKey: "verifiedBy",
      });
    }
  }
  Fact.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      articleId: DataTypes.INTEGER,
      source: DataTypes.TEXT,
      verdict: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      verified: DataTypes.BOOLEAN,
      verifiedBy: DataTypes.INTEGER,
      verifiedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Fact",
    }
  );
  return Fact;
};
