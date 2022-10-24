// require express
const router = require('express');

// import api routes
const apiRoute = require('./api');

// add api to search /api
router.user('/api', apiRoute);

// 404 error
router.user((req, res) => {
    res.status(404).send('404 Error')
});

// export
module.exports = router;