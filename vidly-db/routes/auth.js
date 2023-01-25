const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//handling POST request
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    //confirms that we have the user
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    //if we do not have the user
    if (!user) return res.status(400).send("Invalid Email/Password");
    //you dont want to return a 404

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10); //cb is turned into a promise
    user.password = await bcrypt.hash(user.password, salt) //3rd args cb turned into a promise too since we are accessing it asynchronously
    
    await user.save();

    // res.send(user);
    res.send(_.pick(user, ["_id", "name", "email"]));
});

//valide user not the user object
function validate(req) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(req, value);
}

module.exports = router;