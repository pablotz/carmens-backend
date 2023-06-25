/**
 * @fileoverview Recepie controller
 */

// Imports
const {
    listAll,
    putNew,
    getRecepie
} = require('../models/recepieModel');

const { getUser } = require('../models/userModel');
const recepieSchema = require('../helpers/recepieValidationSchema');
const { nameToCammelCase } = require('../helpers/transformInformation');
const {cyperUser} = require('../helpers/userValidation');

/**
 * GET all recepies from a user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Array} recepies
 * 
 * 
 */
const getAll = async (req, res, next) => {
    try {
        // User will bring from authorization header
        let userName = req.headers.authorization;
        userName = userName.split(" ")[1];
        let hash = cyperUser(userName);

        // Check if user exists
        const user = await getUser(hash);
        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        const recepies = await listAll(hash);
        res.status(200).json({
            status: 'success',
            recepies
        });
    } catch (err) {
        next(err);
    }
}

/**
 * GET a recepie by id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} recepie
 */

const getById = async (req, res, next) => {
    try {
        let userName = req.headers.authorization;
        userName = userName.split(" ")[1];
        let hash = cyperUser(userName);

        // Check if user exists
        const user = await getUser(hash);
        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        const recepie = await getRecepie(hash, req.params.name);
        res.status(200).json({
            status: 'success',
            recepie
        });
    } catch (err) {
        next(err);
    }
}


/**
 * POST a new recepie
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 */

const createNew = async (req, res, next) => {
    try {
        let userName = req.headers.authorization;
        userName = userName.split(" ")[1];
        let hash = cyperUser(userName);

        // Check if user exists
        const user = await getUser(hash);
        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        
        const bodyValidation = await recepieSchema.validateAsync(req.body);

        let fileKey = nameToCammelCase(bodyValidation.name);
        const createNewRecepie = await putNew(hash, bodyValidation, fileKey);
        res.status(201).json({
            status: 'success',
            createNewRecepie
        });

    } catch (err) {
        if(err.isJoi === true) err.status = 422;
        next(err);
    }
}

/**
 * PUT a recepie
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * 
 */

const update = async (req, res, next) => {
    try {
        
        //TODO: function to get which user is making the request
        const bodyValidation = await recepieSchema.validateAsync(req.body);
        //name will be autocompleted
        const updateRecepie = await putNew(bodyValidation, req.params.name);
        res.status(200).json({ 
            status: 'success',
            updateRecepie
        });
    } catch (err) {
        next(err);
    }
};
        

// Exports
module.exports = {
    getAll,
    createNew,
    getById,
    update
}