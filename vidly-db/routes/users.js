const _ = require("lodash");
const {validateUser, User} = require("../models/user")
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//handling POST request
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists...");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    await user.save();

    // res.send(user);
    res.send(_.pick(user, ["_id", "name", "email"]));

    // res.send({
    //     name: user.name,
    //     email: user.email
    // }); //to not return user pasword back to client
    
});

module.exports = router;