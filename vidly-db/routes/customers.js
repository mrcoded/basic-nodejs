const {Customer, validate} = require("../models/customers")
const express = require("express");
const router = express.Router();
//_id: req.params.id

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
    const {error} = validate(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   

    const customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
 });
    customer = await customer.save();
    // customer = await customer.save();

    res.send(customer);
});

//handling PUT request
router.put("/:id", async (req, res) => {
    //validate request
    const {error} = validate(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, {
        new: true
    });

    if(!customer) return res.status(404).send("Genre not found");
    res.send(customer);
});

//handling DELETE request
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer) return res.status(404).send("Genre not found..");
    res.send(customer);
});

module.exports = router;