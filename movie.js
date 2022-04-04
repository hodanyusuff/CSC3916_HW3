let envPath = __dirname + "/../.env"
require('dotenv').config({path:envPath});
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let User = require('../Users');
chai.should();

chai.use(chaiHttp);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}

//Movie schema
var MovieSchema = new Schema({
    title: { type: String, required: true, index: { unique: true }},
    releaseDate: { type: Number, min: [1900, 'Must be greater than 1899'], max: [2100, 'Must be less than 2100']},
    genre: {type: string, required: true, index: {unique: true}},
    actors: {type: string, required: true, index: {unique: true}},

});

module.exports = mongoose.model('Movie', MovieSchema);
