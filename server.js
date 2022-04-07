/*
file: server.js
description: WEB API for movie API
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authjwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');
var Movie = require('./Movie');
var Review = require('./Review');



require('dotenv').config({ path: './.env' });

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

//function getJSONObjectForMovieRequirement(req) {
  //  var json = {
     //   headers: "No headers",
     //   key: process.env.UNIQUE_KEY,
       // body: "No body"
   // };
   // if (req.headers != null) {
      //  json.headers =req.headers;
    //}
  //  return json;
//}
router.post('/signup', function(req,res){

    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save( function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);

            }
            res.json({success: true, msg: 'successfully created new user.'})
        });
    }
});
router.post('/signin', function (req,res){
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({username: userNew.username}).select('name username password').exec( function(err, user) {
        if (err) {
            res.send(err);
        }


        user.comparePassword(userNew.password, function(isMatch) {
            if(isMatch) {
                var userToken = { id: user.id, username: user.username};
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json({success: true, token: 'jwt' + token});

            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed.'});
            }

        })
    })
});


router.post('/review', function(req,res){

    if (!req.body.qoute || !req.body.rating) {
        res.json({success: false, msg: 'please include both qoute and rating to review.'})
    } else {
        var review = new Review();
        review.name = req.body.name;
        review.qoute = req.body.qoute;
        review.rating = req.body.rating;

        review.save( function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({success: false, message: 'A review with that qoute already exists.'});
                else
                    return res.json(err);

            }
            res.json({success: true, msg: 'successfully created new review.'})
        });
    }
});


router.get('/review', function (req,res){

    Review.find().select('name qoute rating').exec( function(err, review) {
        if (err) {
            res.send(err);
        }

        res.json (review)

        })
    })

router.post('/movie', function(req,res){

    if (!req.body.title || !req.body.releaseDate || !req.body.genre || !req.body.actors ) {
        res.json({success: false, msg: 'please include title, releaseDate, genre and actors to movie.'})
    } else {
        var movie = new Movie();
        movie.title = req.body.title;
        movie.releaseDate = req.body.releaseDate;
        movie.genre = req.body.genre;
        movie.actors = req.body.actors;

        movie.save( function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({success: false, message: 'A movie with that title already exists.'});
                else
                    return res.json(err);

            }
            res.json({success: true, msg: 'successfully created new movie.'})
        });
    }
});
router.get('/movie', function (req,res){

    Movie.find().select('title releaseDate genre actors').exec( function(err, movie) {
        if (err) {
            res.send(err);
        }
        res.json (movie)

        })
    })







app.use('/', router);
app.listen(process.env.PORT || 3000);
module.exports = app; // for testing only
