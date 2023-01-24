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

function validateRental(rentals) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(), //return genreId from client
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(rental, value);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
exports.genreSchema = genreSchema;