"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Komen }) {
      this.hasMany(Post, {
        foreignKey: "userId",
        as: "posts",
        onDelete: "cascade",
        hooks: true,
      });
      this.hasOne(Komen, {
        foreignKey: "userId",
        as: "commentar",
        onDelete: "cascade",
        hooks: true,
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have name" },
          notEmpty: {
            msg: "name tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have password" },
          notEmpty: {
            msg: "password tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have email" },
          notEmpty: {
            msg: "email tidak boleh kosong",
          },
          isEmail: { msg: "email not valid" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
