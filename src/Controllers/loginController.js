module.exports = loginController =
    function(loginService) {
        return {
            middleware: middleware = function(req, res, next) {
                //Secure all routes
                //if (!req.user) {
                //    res.redirect('/');
                //}
                next();
            },

            Get: Get = function(res, req) {
                res.render('login');
            },
            Login: Login = function(req, res) {
                var user = loginService.Login();
                res.render('index', loginService.LoginInUser(req.data));
            },
            Register: Register = function(req, res) {
                res.render('index', loginService.RegisterUser(req.data));
            }

        };
    };