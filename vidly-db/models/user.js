const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024 //long because we will store a hash password as string
    } //remove new from mongoose because mongoose is not a class, but a mthod
}));

const Joi = require("joi"); //Joi cos it returns a class

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(user, value);
}


exports.validateUser = validateUser;
exports.User = User;
