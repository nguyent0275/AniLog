const path = require("path");
const express = require("express");
<<<<<<< HEAD
=======
const session = require("express-session");
>>>>>>> Develop
const routes = require("./controllers");
// import sequelize connection
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
<<<<<<< HEAD
=======
const SequelizeStore = require("connect-session-sequelize")(session.Store);
>>>>>>> Develop
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
=======
app.use(express.static(path.join(__dirname, "/public")));

const hbs = exphbs.create({ helpers });

// set up sessions
const sess = {
  secret: "JUVEIjf834nh38hbH",
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
>>>>>>> Develop

app.use(routes);

// sync sequelize models to the database, then turn on the server
<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
=======
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
  });
>>>>>>> Develop
});
