const router = require('express').Router();
const userRoutes = require('./user-routes');
const statusRoutes = require('./status-routes');
const animeRatingRoutes = require('./animeRating-routes');

router.use('/user', userRoutes);
router.use('/status', statusRoutes);
router.use('/rating', animeRatingRoutes);

module.exports = router;
