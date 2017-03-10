var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);

            var url = 'mongodb://localhost:27017/Chatter';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email
                };

                var filter = {
                    Username: req.body.Username
                };

                if (collection.find(filter).count(function(err, num) {
                        if (num === 0) {
                            collection.insert(user, function(err, results) {
                                req.login(results.Username, function() {
                                    res.redirect('/Auth/profile');
                                });
                            });
                        } else {
                            res.render('index', {
                                Error: "User Exists"
                            });
                        }

                    }));
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/chat'
        }), function(req, res) {
            res.redirect('/chat');

        });
    // .get(function(req, res) {
    //     res.send('hmmm......');
    // });

    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });



    authRouter.route('/Register')

    .get(function(req, res) {
        res.render('register');
    });


    return authRouter;
};

module.exports = router;