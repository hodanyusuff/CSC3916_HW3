



var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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


