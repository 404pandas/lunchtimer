// Global import
const path = require("path");

// External imports
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Internal imports
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "This is a secret shhhh",
  cookie: {
    maxAge: 60 * 60 * 1000,
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

// Sets handlebars as html to be served
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Defines all folders to be served
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on port ${PORT} at http://localhost:${PORT}`)
  );
});
