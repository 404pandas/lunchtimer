const { Comment } = require("../models");

const commentData = [
  {
    content: "testestestestest",
    user_id: 1,
  },
  {
    content: "testestetse",
    user_id: 1,
  },
  {
    content: "testestestestest",
    user_id: 1,
  },
  {
    content: "testestsetsetest",
    user_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
