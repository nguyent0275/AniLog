const router = require("express").Router();
const { Status, User, Anime } = require("../../models");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10

// the application end point is /api/user

// gets all users
router.get("/", async(req, res) => {
    try{
        // finds all users
        const userData = await User.findAll({
            // gets each user's associated status/list
            // include: [{model: Status}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// gets user by username / shows their lists
router.get("/:user_name", async(req, res) => {
    try{
        // finds user by their primary key (uuid)
        const userData = await User.findOne({
            where: {
                user_name : req.params.user_name
            },
            // gets user's associated status/list
            include: [{model: Status}]
        });
        const statuses = userData.statuses.map((status) => status.get({plain: true}))
        res.render('list', {statuses})
        if(!userData){
            res.status(404).json({
                message: "No user associated with that id"
            })
        }
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        // res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// creates user
router.post("/", async (req,res) => {
    try {
        const newUser = req.body;
    
        // checking for empty fields and returning appropriate message corresponding to the missing field
        if (!newUser.email) {
            res.json({message: 'Please enter a valid email'})
        } else if (!newUser.user_name) {
            res.json({message: 'Please enter a valid username'})
        } else if (!newUser.password) {
            res.json({message: 'Please enter a valid password'})
        } else {
            // creates the user if all fields pass, the password is being hashed before the create with a hook on the model
            const userData = await User.create(newUser);

            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        }

        // THESE ARE USED FOR TESTING. DELETE AT THE END !!
        // console.log(req.session.user_id);
        // console.log(req.session.logged_in);
    } catch (err) {
        res.status(400).json(err);
    }
})

// login route (finds a user by email then checks the input password against the database's stored password)
router.post('/login', async (req,res) => {
    try {
        // finds one user by the request email (user input email when logging in)
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        console.log(userData)
        // if no user data is returned, serves a login failure message and ends the route with the 'return'
        if (!userData) {
            res
                .status(404)
                .json({message: 'Login failed. Please try again!'});
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
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
      
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
            
                res.json({ user: userData, message: 'You are now logged in!' });
            });
    } catch (err) {
        res.status(500).json(err)
    }
})

// updates user by id 
router.put("/:id", async (req, res) => {
    try {
        const userData = await User.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if(!userData){
        res.status(404).json({
            message: "No user associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// deletes user by id 
router.delete("/:id", async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!userData){
            res.status(404).json({
                message: "No user associated with that id"
            })
            return;
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;