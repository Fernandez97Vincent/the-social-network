// require express
const router = require('express').Router();

// routes for thought and user
const thoughtRoute = require('./thought-routes');
const userRoute = require('./user-routes');

// use /users
router.use('/user', userRoute);

// use /thought
router.use('/thoughts', thoughtRoute);

// export
module.exports = router;
