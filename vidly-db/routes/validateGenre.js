// const Joi = require("joi"); //Joi cos it returns a class

function validateCourse(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(genre, value);
}

module.exports = validateCourse;