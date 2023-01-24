const { required } = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    customer: { 
    type: new mongoose.Schema({ //picking only the properties we need from  customers
        name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }, 
    isGold: {
        type: Boolean,
        default: false
    },
    phone: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } //remove new from mongoose because mongoose is not a class, but a mthod
    }),
    required: true
    },
    movie: {
        type:  new mongoose.Schema({
            title: { 
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }}),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(), 
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(rental, value);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
exports.genreSchema = genreSchema;