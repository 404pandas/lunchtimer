const sequelize = require("../config/config");
const seedUsers = require("./userData.js");
const seedComments = require("./commentData.js");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedComments();

  process.exit(0);
};

seedAll();
