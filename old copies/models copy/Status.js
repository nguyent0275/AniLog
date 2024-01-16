const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    anime_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "anime",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    watch_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "status",
  }
);

module.exports = Status;
