const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {validateUser, User} = require("../models/user")
const express = require("express");
const router = express.Router();

// handling GET current-User request By ID
// router.get("/me", auth, async (req, res) => {
//     if (await User.exists({ _id: req.user._id })) {
//         const user = await User.findById(req.user._id).select("-password");
//         res.send(user);
//         console.log(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// });
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    //select() to exclude returning user password
    res.send(user);
    console.log(user);
});

//handling POST request
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists...");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10); //cb is turned into a promise
    user.password = await bcrypt.hash(user.password, salt); //3rd args cb turned into a promise too since we are accessing it asynchronously
    
    // user = new User({
    //     name: req.body.name, 
    //     email: req.body.email,
    //     password: req.body.password
    // });
    await user.save();

    const token = user.generateAuthToken();
    // const token = jwt.sign({ _id: user._id}, config.get("jwtPrivateKey")); //replaced with usergenerateAuth method
    
    //setup response header
    res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
    // res.send(_.pick(user, ["_id", "name", "email"])); //lodash approach
    
    // res.send(user);

    // res.send({
    //     name: user.name,
    //     email: user.email
    // }); //to not return user pasword back to client
    
});

module.exports = router;