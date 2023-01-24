//movies model is utilizing the hybrid approach for relationship

const mongoose = require("mongoose");
import { genreSchema } from "./genres";

const Movie = mongoose.model("Movies", new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    }, //remove new from mongoose because mongoose is not a class, but a mthod
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().min(5).max(50).required(), //return genreId from client
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(movie, value);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;