var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

router.route('/movie')// this is all movies
    .post(authController.isAuthenticated, function(req, res) {
            console.log(req.body);
            res = res.status(200);
            if(req.get('content-Type')) {
                res = res.type(req.get('content-Type'));
            }
            var o = getJSONObjectForMovieRequirement(req);
            res.json(o);
        }
    )
    .get(authJwtController.isAuthenticated, function (req, res){
            console.log(req.body);
            res = res.status(200);
            if(req.get('content-Type')) {
                res = res.type(req.get('content-Type'));
            }
            var o = getJSONObjectForMovieRequirement(req);
            res.json(o);
        }
    );
router.route('/movie/:movieId')//specific movie
    .delete(authController.isAuthenticated, function(req, res) {
            const movie = movie.find(movie => movie.id.toString() === req.params.id);
            res.status(200).json(movie);
        }
    )
    .put(authjwtController.isAuthenticated, function(req, res) {
            const movie = movie.find(movie => movie.id.toString() === req.params.id);
            res.status(200).json(movie);
        }
    )
    .get(authjwtController.isAuthenticated, function(req, res) {
            const movie = movie.find(movie => movie.id.toString() === req.params.id);
            res.status(200).json(movie);
        }
    );



app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only
