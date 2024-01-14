const router = require('express').Router();
const userRoutes = require('./user-routes');
const statusRoutes = require('./status-routes');

router.use('/user', userRoutes);
router.use('/status', statusRoutes);

module.exports = router;
