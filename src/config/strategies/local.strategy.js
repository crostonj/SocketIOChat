var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;
//user = require('../../Data/User');

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'Username',
            passwordField: 'Password'
        },
        function(username, password, done) {
            var url = 'mongodb://localhost:27017/Chatter';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                        Username: username
                    },
                    function(err, results) {
                        if (!err) {
                            if (results.Password === password) {
                                var user = results;
                                done(null, user);
                            } else {
                                done(null, false, { message: 'Bad Password' });
                            }
                        } else {
                            console.log(err);
                            done(null, false, { message: 'Username not found' });
                        }
                    }
                );
            });
        }));
};