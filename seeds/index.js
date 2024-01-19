const seedUser = require("./user-seeds");
const seedStatus = require("./status-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");

  await seedStatus();
  console.log("\n---- STATUSES SEEDED -----\n");

  process.exit(0);
};

seedAll();
