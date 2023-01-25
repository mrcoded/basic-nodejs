const {validateUser, User} = require("../models/user")
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//handling POST request
router.post("/", async (req, res) => {
    const movies = await Movie.find().sort("name");
    res.send(movies);
});

module.exports = router;