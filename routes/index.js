// require express
const router = require('express').Router();

// import api routes
const apiRoute = require('./api');

// add api to search /api
router.use('/api', apiRoute);

// 404 error
// router.use((req, res) => {
//     res.status(404).send('404 Error')
// });

// export
module.exports = router;