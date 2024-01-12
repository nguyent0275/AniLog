const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class AnimeCategory extends Model {}

AnimeCategory.init(
  {
    // comment back in if want to do retrieval by primary key (otherwise useless)
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    anime_name: {
      type: DataTypes.INTEGER,
      references: {
        model: "anime",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "category_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "anime_category",
  }
);

module.exports = AnimeCategory;
