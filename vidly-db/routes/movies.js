const {validateMoview, Movie} = require("../models/movie")
const express = require("express");
const { required } = require("joi");
const {Genre} = require("../models/genres");
const validateGenre = require("./validateGenre");
const router = express.Router();

//handling GET request
router.get("/", async (req, res) => {
    const movies = await Movie.find().sort("name");
    res.send(movies);
});

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateMoview(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const genre = await Genre.findById(req.body.genreId); //find by genreId
    if(!genre) return res.status(404).send("Genre not found...");

    let movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();

    res.send(movie);
});