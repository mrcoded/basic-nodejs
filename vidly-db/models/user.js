const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024 //long because we will store a hash password as string
    } //remove new from mongoose because mongoose is not a class, but a mthod
}));

exports.Genre = Genre;
exports.genreSchema = genreSchema;