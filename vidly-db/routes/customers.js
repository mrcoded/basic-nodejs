const Joi = require("joi"); 
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
//_id: req.params.id

const Customer = mongoose.model("Customer", new mongoose.Schema({
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
    }
}));

//handling GET request
router.get("/", async (req, res) => {
    const customer = await Customer.find().sort("name");
    res.send(customer);
});

//handling GET request By ID
router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
    if(!customer) return res.status(404).send("Genre not found...");
});

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateCustomer(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   

    let customer = new Customer({ name: req.body.name })
    customer = await customer.save();

    res.send(customer);
});


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
        const value = { name: "" }
    //input validation with Joi
    return schema.validate(customer, value);
}

module.exports = customer;