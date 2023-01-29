require("express-async-errors");
const winston = require("winston");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" }));

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey not defined...");
    process.exit(1);
}

mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to the mongoDB..."))
    .catch(err => console.log("Could not connect to mongoDB...", err));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error); //add error middleware after all route handling

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));