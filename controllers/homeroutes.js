const router = require("express").Router();

// withAuth will ensure that the user is logged in before access
router.get('/anything', (req, res) => {
    res.render('anything', {
      // fill in later???
      // layout: 'other_main' // layouts/other_main.handlebars
    });
  });

module.exports = router