const express = require("express");
const {Rental, validateRental} = require("../models/rentals");
const router = express.Router();
//_id: req.params.id

//handling GET request
router.get("/", async (req, res) => {
    const rental = await Rental.find().sort("name");
    res.send(rental);
});

//handling GET request By ID
router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    res.send(rental);
    if(!rental) return res.status(404).send("Rental not found...");
});

//handling POST request
router.post("/", async (req, res) => {
    //validate request
    const {error} = validateRental(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
    }   

    let rental = new Rental({ name: req.body.name })
    rental = await rental.save();

    res.send(rental);
});

//handling PUT request
router.put("/:id", async (req, res) => {
    //validate request
    const {error} = validateRental(req.body);
    //if invalid return 400
    if (error) {
    //400 Bad request
    return res.status(400).send(error.details[0].message);
    }   

    const rental = await Rental.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, {
        new: true
    });

    if(!rental) return res.status(404).send("Rental not found");
    res.send(rental);
});

//handling DELETE request
router.delete("/:id", async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);

    if(!rental) return res.status(404).send("Rental not found..");
    res.send(rental);
});

module.exports = router;