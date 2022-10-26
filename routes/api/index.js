// require express
const router = require('express').Router();

// routes for thought and user
const thoughtRoute = require('./thought-routes');
const userRoute = require('./user-routes');


// use /thought
router.use('/thoughts', thoughtRoute);
// use /users
router.use('/user', userRoute);



// export
module.exports = router;
