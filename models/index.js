// import models
const User = require("./User");
const Status = require("./Status");

// 1 to many
User.hasMany(Status, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Status.belongsTo(User);

module.exports = {
  Status,
  User,
};
