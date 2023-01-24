const express = require("express");
const {Genre} = require("../models/genres");
const validateGenre = require("./validateGenre");
const router = express.Router();
//_id: req.params.id

//handling GET request
router.get("/", async (req, res) => {
    const genre = await Genre.find().sort("name");
    res.send(genre);
});

//handling GET request By ID
router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
    if(!genre) return res.status(404).send("Genre not found...");
});

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

    const genre = new Genre({ name: req.body.name })
    await genre.save();

    res.send(genre);
});

//handling PUT request
router.put("/:id", async (req, res) => {
    //validate request
    const {error} = validateGenre(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const genre = await Genre.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, {
        new: true
    });

    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre);
});

//handling DELETE request
router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("Genre not found..");
    res.send(genre);
});

module.exports = router;