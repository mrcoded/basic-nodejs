//movies model is utilizing the hybrid approach for relationship

const mongoose = require("mongoose");

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
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

exports.Genre = Movie;