const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
    {id: 1,  name: "Game of thrones"},
    {id: 2,  name: "How to get away with murder"},
    {id: 3,  name: "On my block"}
];

app.get("/api/genres/:id", (res, req) => {
    res.send(genre);
});

//handling GET request
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");
    else return res.send(genre);
}); //get unique genre

//handling POST request
app.post("/api/genres/", (req, res) => {
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
app.post("/api/genres/:id", (req, res) => {
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
app.post("/api/genres/:id", (req, res) => {
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