const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
    {id: 1,  movie: "Game of thrones"},
    {id: 2,  movie: "How to get away with murder"},
    {id: 3,  movie: "On my block"}
];

