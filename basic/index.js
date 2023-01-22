const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const genres = require("./routes/genres");
const app = express();


mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to the database..."))
    .catch(err => console.log("Could not connect to db...", err));

app.use(express.json());

app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));