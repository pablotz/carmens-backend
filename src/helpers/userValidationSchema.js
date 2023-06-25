const joi = require('@hapi/joi')
const userSchema = joi.object(
    {
        id: joi.string().required(),
        userName: joi.string().required()
    }
);

module.exports = userSchema;
    