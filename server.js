const path = require("path");
const express = require("express");
const session = require('express-session');
const routes = require("./controllers");
// import sequelize connection
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({ helpers });

// set up sessions
const sess = {
    secret: 'JUVEIjf834nh38hbH',
    cookie: {
        maxAge: 1800000,
    	httpOnly: true,
    	secure: false,
    	sameSite: 'strict',
  	},
  	resave: false,
  	saveUninitialized: true,
  	store: new SequelizeStore({
    	db: sequelize
  	})
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
  });
});