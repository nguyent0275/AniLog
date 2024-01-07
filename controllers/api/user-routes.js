const router = require("express").Router();
const { Status, User } = require("../../models");
const bcrypt = require("bcrypt");

// the application end point is /api/user

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

router.get("/:id", async(req, res) => {
    try{
        // finds user by their primary key (uuid)
        const userData = await User.findByPk(req.params.id, {
            // gets user's associated status/list
            // include: [{model: Status}]
        });
        if(!userData){
            res.status(404).json({
                message: "No user associated with that id"
            })
        }
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    try {
        // creates a new user
        const newUser = req.body;

        // hash the password from 'req.body' and save to newUser
        newUser.password = await bcrypt.hash(req.body.password, 10);
        // create the newUser with the hashed password and save to DB
        const userData = await User.create(newUser);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
})

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