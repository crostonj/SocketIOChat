var express = require('express');
var loginRouter = express.Router();

module.exports = router = function() {

    var loginService = require('../Services/loginService')();
    var loginController = require('../Controllers/loginController')(loginService);
    loginRouter.use(loginController.middleware);

    loginRouter.route('/')
        .get(loginController.Get);

    loginRouter.route('/Login')
        .get(loginController.Login);

    loginRouter.route('/register')
        .get(loginController.Register);

    return loginRouter;
};