var express = require('express');
var indexRouter = express.Router();

module.exports = router = function() {
    var loginService = require('../Services/loginService')();
    var indexService = require('../Services/indexService')();
    var indexController = require('../Controllers/indexController')(indexService, loginService);
    indexRouter.use(indexController.middleware);

    indexRouter.route('/')
        .get(indexController.Get);

    return indexRouter;
};