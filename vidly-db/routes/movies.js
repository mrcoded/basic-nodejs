const {validateGenre, Movie} = require("../models/movie")
const express = require("express");
const { required } = require("joi");
const {Genre} = require("../models/genres");
const validateGenre = require("./validateGenre");
const router = express.Router();

//handling GET request
router.get("/", async (req, res) => {
    const movie = await Movie.find().sort("name");
    res.send(movie);
});
