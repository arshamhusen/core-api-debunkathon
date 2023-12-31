"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.hasMany(models.User, {
        foreignKey: "userId",
      });
      UserRole.hasMany(models.Role, {
        foreignKey: "roleId",
      });
    }
  }
  UserRole.init(
    {
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
