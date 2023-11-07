const { User } = require("../models");

const userData = [
  {
    username: "404pandas",
    email: "mary.panda.jackson@gmail.com",
    password: "testtest",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
