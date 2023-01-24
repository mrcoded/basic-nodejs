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