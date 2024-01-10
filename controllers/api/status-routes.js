const router = require("express").Router();
const { Anime, CategoryName, Category, Status, User } = require("../../models");

// the application end point is /api/status

router.get("/", async(req, res) => {
    try{
        // finds all categories
        const statusData = await Status.findAll({
            // gets each category's associated category name
            // include: [{model: CategoryName, model: Category}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(statusData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        // finds all the statuses of a singular user by their id
        const statusData = await Status.findAll({
            // gets status's associated status/list
            where: {
                user_id : req.params.id
            },
            // include: [{model: Anime, model: User}],
        }
        );
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(statusData)
        console.log(statusData)
        // res.render("list")
    } catch (err) {
        res.status(500).json(err)
    }
})

// have to make sure you're logged in to work (not currently working)
router.post("/add-to-list", async (req,res) => {
    try{
        const newStatus = await Status.create({
            ...req.body,
            // adds to list of the logged in user
            user_id : req.session.user_id
        })
        res.status(200).json(newStatus)
    } catch (err){
        res.status(500).json(err)
    }
})



router.post("/", async (req,res) => {
    try {
        // creates a new status
        const statusData = await Status.create(req.body);
        res.status(200).json(statusData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const statusData = await Status.update(req.body, {
            // updates by the status id
        where: {
            id: req.params.id,
        },
    });
    if(!statusData){
        res.status(404).json({
            message: "No status associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(statusData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// not currently working 
// "Cannot delete or update a parent row: a foreign key constraint fails (`anime_db`.`category_name`, CONSTRAINT `category_name_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`))",
router.delete("/:id", async (req, res) => {
    try {
        const statusData = await Status.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!statusData){
            res.status(404).json({
                message: "No status associated with that id"
            })
            return;
        }
        res.status(200).json(statusData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;