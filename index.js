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