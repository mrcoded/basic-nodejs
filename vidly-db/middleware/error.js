const winston = require("winston");

module.exports = function(err, req, res, next) {
    winston.error(err.message, err); //winston.log(error)

    //***helper func .log**
    //error
    //warm
    //info
    //verbose
    //debug
    //silly

    res.status(500).send("Request failed!");       
}