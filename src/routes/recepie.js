/**
 * Routes for all recepie related requests
 */

const express = require('express');
const router = express.Router();
const recepieController = require('../controllers/recepieController');

router.use((req, res, next) => {
    console.log(`
    Time of the request: ${Date.now()}
    Requested URL: ${req.url}
    `);

    next();
});

//GET all recepies
router.get('/all', recepieController.getAll);

//GET a recepie by id
router.get('/:name', recepieController.getById);

//POST a new recepie
router.post('/new', recepieController.createNew);

//PUT a recepie
router.put('/:name', recepieController.update);



module.exports = router;