const seedUser = require("./user-seeds");
<<<<<<< HEAD
const seedAnime = require("./anime-seeds");
const seedCategory = require("./category-seeds");
const seedCategoryName = require("./categoryName-seeds");
=======
>>>>>>> Develop
const seedStatus = require("./status-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");

  await seedStatus();
  console.log("\n---- STATUSES SEEDED -----\n");

<<<<<<< HEAD
  await seedCategoryName();
  console.log("\n----- CATEGORY NAME SEEDED -----\n");

=======
>>>>>>> Develop
  process.exit(0);
};

seedAll();
