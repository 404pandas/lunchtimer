const User = require("./User");
const Comment = require("./Comment");
const Fact = require("./Fact");

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Comment, Fact };
