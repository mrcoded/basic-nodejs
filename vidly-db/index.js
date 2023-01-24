const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const app = express();


mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to the mongoDB..."))
    .catch(err => console.log("Could not connect to mongoDB...", err));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));