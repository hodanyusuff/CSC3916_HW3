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



require('dotenv').config({ path: './.env' });

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();


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

          var user = async 
        User();
        const User = await User.findOne({_id: req.user.userId});
        if (!user) {
            throw new CustomError.UserNotFound();
        }
        const isPasswordValid = await user.comparePassword(Password);
    })
});

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
