const {Rental, validateRental} = require("../models/rentals");
const {Movie} = require("../models/movie");
const {Customer} = require("../models/customers");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();
//_id: req.params.id

Fawn.init("mongodb://127.0.0.1:27017/vidly");

//handling GET request
router.get("/", async (req, res) => {
    const rental = await Rental.find().sort("-dateOut");
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
    return res.status(400).send(error.details[0].message);
    }   

    if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
        return res.status(400).send("Invalid customer...");

    const customer = await Customer.findById(req.body.customerId); //find by genreId
    if(!customer) return res.status(400).send("Customer Invalid...");
    
    const movie = await Movie.findById(req.body.movieId); //find by genreId
    if(!movie) return res.status(400).send("Movie Invalid...");

    if(movie.numberInStock === 0) return res.status(400).send("Movie not found...")

    let rental = new Rental({ 
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    try {
        new Fawn.Task()
        .save("rentals", rental)
        .update("movies", {_id: movie._id}, {
            $inc: { numberInStock: -1 } //for increment
        })
        .run();
        // rental = await rental.save(); ***use fawn instead**
        // movie.numberInStock--;
        // movie.save(); //second save is called transaction to ensure even if the server crashes is still saves
      res.send(rental);
    } 
    catch(ex) {
        res.status(500).send("Internal Server Error...")
    }
}); //set genre properties

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