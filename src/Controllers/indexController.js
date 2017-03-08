var schema = require('../Data/User');
module.exports = IndexController =
    function(indexService, loginService) {
        return {
            middleware: middleware = function(req, res, next) {
                //Secure all routes
                //if (!req.user) {
                //    res.redirect('/');
                //}
                next();
            },
            Get: Get = function(data) {
                var user = loginService.LoginInUser(data);
                if (!req.user) {
                    res.redirect('/login');
                }
                res.render('index', res.user);
            }


        };
    };