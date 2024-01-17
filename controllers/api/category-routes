const router = require("express").Router();
const { Anime, CategoryName, Category } = require("../../models");

// the application end point is /api/category

router.get("/", async(req, res) => {
    try{
        // finds all categories
        const categoryData = await Category.findAll({
            // gets each category's associated category name
            // include: [{model: CategoryName, model: Category}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        // finds category by their primary key (uuid)
        const categoryData = await Category.findByPk(req.params.id, {
            // gets category's associated status/list
            // include: [{model: CategoryName, model: Category}]
        }
        );
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    try {
        // creates a new category
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const categoryData = await Category.update(req.body, {
        where: {
            category_id: req.params.id,
        },
    });
    if(!categoryData){
        res.status(404).json({
            message: "No category associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// not currently working 
// "Cannot delete or update a parent row: a foreign key constraint fails (`anime_db`.`category_name`, CONSTRAINT `category_name_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`))",
router.delete("/:id", async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                category_id: req.params.id
            }
        });
        if(!categoryData){
            res.status(404).json({
                message: "No category associated with that id"
            })
            return;
        }
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;