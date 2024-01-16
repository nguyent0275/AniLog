const router = require('express').Router();
const userRoutes = require('./user-routes');
const statusRoutes = require('./status-routes');
const categoryRoutes = require('./category-routes');
const categoryNameRoutes = require('./categoryNames-routes');
const animeRatingRoutes = require('./animeRating-routes');


router.use('/user', userRoutes);
router.use('/status', statusRoutes);
router.use('/categories', categoryRoutes);
router.use('/categoryNames', categoryNameRoutes);
router.use('/rating', animeRatingRoutes);


module.exports = router;
