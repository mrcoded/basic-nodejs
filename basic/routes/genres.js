const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
    {id: 1,  name: "Game of thrones"},
    {id: 2,  name: "How to get away with murder"},
    {id: 3,  name: "On my block"}
];


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
router.put("/:id", (req, res) => {
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

}); //update to movie genre

//handling DELETE request
router.delete("/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
}); //delete to movie genre

module.exports = router;