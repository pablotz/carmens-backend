/**
 * Routes for all user related requests
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.use((req, res, next) => {
    console.log(`
    Time of the request: ${Date.now()}
    Requested URL: ${req.url}
    `);

    next();
});

//POST register a new user
router.post('/register', userController.register);

//POST login
router.post('/login', userController.login);



module.exports = router;