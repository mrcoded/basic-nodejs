const mongoose = require("mongoose");
// const validateCourse = require("./validateGenre");
const Joi = require("joi");
const express = require("express");
const validateGenre = require("./validateGenre");
const router = express.Router();

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } //remove new from mongoose because mongoose is not a class, but a mthod
}));

//handling GET request
router.get("/", async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
});


router.get("/:id", async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
    if(!genre) return res.status(404).send("Genre not found");
    else return res.send(genre);
}); //get unique genre

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateGenre(req.body);

    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   

    let genre = new Genre({ name: req.body.name })
    genre = await genre.save();

    res.send(genre);
}); //post to movie genre

//handling PUT request
router.put("/:id", async (req, res) => {
    //validate request
    const {error} = validateGenre(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const genre = await Course.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, {
        new: true
    });

    if(!genre) return res.status(404).send("Genre not found");

    res.send(genre);
}); //update to movie genre

//handling DELETE request
router.post("/:id", async (req, res) => {
    const genre = await Course.findByIdAndRemove(req.params.id, {
        new: true
    });

    if(!genre) return res.status(404).send("Genre not found");

    res.send(genre);
}); //delete a movie genre

module.exports = router;