const mongoose = require("mongoose");
const validateCourse = require("./validateGenre");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const Genre = new mongoose.model("Genre", new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } 
}));

//handling GET request
router.get("/", async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
});


router.get("/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");
    else return res.send(genre);
}); //get unique genre

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateCourse(req.body);

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
router.post("/:id", async (req, res) => {
    const genre = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
  });
//   const genre = genres.find(genre => genre.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send("Genre not found");

    //validate request
    const {error} = validateGenre(req.body);
  
    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   
}); //post to movie genre

//handling DELETE request
router.post("/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
}); //delete to movie genre

module.exports = router;