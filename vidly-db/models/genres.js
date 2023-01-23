const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } //remove new from mongoose because mongoose is not a class, but a mthod
}));

exports.Genre = Genre;