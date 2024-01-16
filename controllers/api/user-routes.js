const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Status, User, Anime } = require("../../models");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

// the application end point is /api/user

// gets all users
router.get("/", async (req, res) => {
  try {
    // finds all users
    const userData = await User.findAll({
      // gets each user's associated status/list
      // include: [{model: Status}]
    });
    //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets user by username / shows their lists
router.get("/:user_name", async (req, res) => {
  try {
    // finds user by their primary key (uuid)
    const userData = await User.findOne({
      where: {
        user_name: req.params.user_name,
      },
      // gets user's associated status/list
      // equivalent of 2 left joins
      include: [
        {
          model: Status,
          include: {
            model: Anime,
          },
        },
      ],
    });
    const statuses = userData.statuses.map((status) =>
      status.get({ plain: true })
    );
    console.log(statuses);
    res.status(200).json(userData);
    // res.render("list", { statuses });
    if (!userData) {
      res.status(404).json({
        message: "No user associated with that id",
      });
    }
    //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
    // res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      console.log(req.session);
    });
    // }
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route (finds a user by email then checks the input password against the database's stored password)
router.post("/login", async (req, res) => {
  try {
    // finds one user by the request email (user input email when logging in)
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(userData);
    // if no user data is returned, serves a login failure message and ends the route with the 'return'
    if (!userData) {
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }
    // we are checking the user's inputted password towards the hashed password saved in the database that's associated with the findOne's email.
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    // if the passwords do not match, login fails and route ends
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.json({ user: userData, message: "You are now logged in!" });

    // THESE ARE USED FOR TESTING. DELETE AT THE END !!
    // console.log(req.session.user_id)
    // console.log(req.session.logged_in)
  } catch (err) {
    res.status(500).json(err);
  }
});

// updates user by id
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({
        message: "No user associated with that id",
      });
      return;
    }
    res.statusMessage(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets rid of session when logging out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// deletes user by id // STILL NEEDS TO BE TESTED
router.delete("/delete", withAuth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.destroy({
        where: {
          id: req.session.user_id,
        },
      });

      req.session.destroy(() => {
        res.status(204).end();
      });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
