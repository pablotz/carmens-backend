const joi = require('@hapi/joi')

const recepieSchema = joi.object(
    {
        name: joi.string().min(3).required(),
        description: joi.string().max(300),
        ingredients: joi.array().items(joi.object({
            name: joi.string().required(),
            unit: joi.number().required(),
            type: joi.string().required()
        })).required(),
        steps: joi.array().items(joi.string()).required(),
        tags: joi.array().items(joi.string()),
        image: joi.string()
    }
);

module.exports = recepieSchema;
    
