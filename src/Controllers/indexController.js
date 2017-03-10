//var schema = require('../Data/User');
module.exports = IndexController =
    function(indexService) {
        return {
            middleware: middleware = function(req, res, next) {
                //Secure all routes
                // if (!req.user) {
                //     res.redirect('/');
                // }
                next();
            },
            Get: Get = function(req, res) {

                res.render('index');
            }
        };
    };