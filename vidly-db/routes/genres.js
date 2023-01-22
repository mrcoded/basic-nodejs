const mongoose = require("mongoose");
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

async function createGenres() {
    const course = new Genre({
        name: "Action"
    });

    try { //save to db to create a new genres
        const result = await course.save(); 
        console.log(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field]); //update to see full info on each errors
    }
}
createCourse();

//handling GET request
router.get("/", (req, res) => {
    res.send(genres);
});

router.get("/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");
    else return res.send(genre);
}); //get unique genre

//handling POST request
router.post("/", (req, res) => {
    //validate request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
        const value = {
            name: ""
        }
    //input validation with Joi
    const {error} = schema.validate(req.body, value);
  
    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
}); //post to movie genre

//handling PUT request
router.post("/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");

    //validate request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
        const value = {
            name: ""
        }
    //input validation with Joi
    const {error} = schema.validate(req.body, value);
  
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