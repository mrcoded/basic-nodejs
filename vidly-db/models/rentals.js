const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } //remove new from mongoose because mongoose is not a class, but a mthod
});

const Rental = mongoose.model("Rental", rentalSchema);

exports.Genre = Rental;
exports.genreSchema = genreSchema;