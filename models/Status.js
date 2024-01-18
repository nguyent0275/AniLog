const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Status extends Model {}

Status.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      allowNull: false,
    },
    anime_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    indexes: [
      {
        unique: true,
        fields: ["user_id", "anime_title"],
      },
    ],
  }
);

module.exports = Status;
