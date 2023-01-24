const {validateMovie, Movie} = require("../models/movie")
const { Genre } = require("../models/genres");
const express = require("express");
const router = express.Router();

//handling GET request
router.get("/", async (req, res) => {
    const movies = await Movie.find().sort("name");
    res.send(movies);
});

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateMovie(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const genre = await Genre.findById(req.body.genreId); //find by genreId
    if(!genre) return res.status(400).send("Movie not found...");

    const movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    //changed to const and dont need to reset movie before we can return id to theclient
    res.send(movie);
}); //set genre properties

module.exports = router;