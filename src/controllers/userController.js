/**
 * @fileoverview User controller
 */

// Imports
const { v4: uuidv4 } = require('uuid');
const {
    createUser,
    getUser
} = require('../models/userModel');
const userSchema = require('../helpers/userValidationSchema');
const {cyperUser} = require('../helpers/userValidation');


/**
 * Register a new user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const register = async (req, res, next) => {
    try {
    
        // Username must not contain spaces
        if(req.body.userName.includes(" ")) {
            throw new Error("Username must not contain spaces");
        }

        let userName = req.body.userName;
        let hash = cyperUser(userName);
        console.log({"message": "User cypthered", "data": hash});

        const user = {
            id: hash,
            userName: req.body.userName,
        };
        
        const validatedUser = userSchema.validate(user);
        
        const createUserResponse = await createUser(validatedUser.value);
        res.status(201).json({
            status: 'success',
            createUserResponse
        });


    } catch (err) {
        // Validate if its an schema validation error
        if(err.isJoi === true) err.status = 422;
        next(err);
    }
};

/**
 * Login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const login = async (req, res, next) => {
    try {
        // Will take username from authorization header
        let userName = req.headers.authorization;
        userName = userName.split(" ")[1];
        let hash = cyperUser(userName);

        const user = await getUser(hash);

        if(user) {
            res.status(200).json({
                status: 'success',
                userId: hash
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (err) {
        next(err);
    }
}


module.exports = {
    register,
    login
}
