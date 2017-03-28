var express = require('express');
var chatRouter = express.Router();

module.exports = router = function() {
    var chatService = require('../Services/chatService')();
    var chatController = require('../Controllers/chatController')(chatService);
    chatRouter.use(chatController.middleware);

    chatRouter.route('/')
        .get(chatController.Get);

    return chatRouter;
};