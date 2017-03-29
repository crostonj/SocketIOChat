$(function() {
    // Initialize variables
    var $window = $(window);

    var username = $("#Username").html();
    var $inputMessage = $('.message-input');
    var $messages = $('#chatdiscussion'); // Messages area
    var userlist = $('users-list');

    var socket = io();


    $("textarea[name='message']").bind("enterKey", function(e) {
        //do stuff here
        sendMessage();
        socket.emit('stop typing');
        typing = false;
    });
    $("textarea[name='message']").keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });

    function sendMessage() {
        var message = $inputMessage.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        //if (message && connected) {
        $inputMessage.val('');
        addChatMessage({
            username: username,
            message: message
        });
        // tell server to execute 'new message' and send along one parameter
        socket.emit('new message', {
            username: username,
            message: message
        });
        //}
    }


    function addParticipantsMessage(data) {
        var chatuserDiv = $('<div class="chat-user">');
        var chatusernameDiv = $('<div class="chat-user-name">');
        var user = $('<a href="#">' + data.username + ' </a>');
        chatusernameDiv.append($('<a href="#">' + data.username + ' </a> ' ));
        chatuserDiv.append(chatusernameDiv);
        userlist.append(chatuserDiv);
    }

    // Adds the visual chat message to the message list
    function addChatMessage(data, options) {
        // Don't fade the message in if there is an 'X was typing'
        //var $typingMessages = getTypingMessages(data);
        options = options || {};
        //if ($typingMessages.length !== 0) {
        //    options.fade = false;
        //$typingMessages.remove();
        //}

        // var $messageDiv = $('<div class="message">');
        var $messageAuthoutDiv = $('<span class="username"/>').text(data.message);
        var $authorDiv = $('<a class="message-author" href="#"> ' + data.username + ' </a> ' + (new Date()).getTime());


        // var typingClass = data.typing ? 'typing' : '';
        // var $messageDiv = $('<li class="message"/>')
        //     .data('username', data.username)
        //     .addClass(typingClass)
        //     .append($usernameDiv, $messageBodyDiv);

        var $chatMessageDiv = $('<div class="chat-message left">')
            .append($authorDiv, $messageAuthoutDiv);
        //.append($authorDiv);
        addMessageElement($chatMessageDiv, options);
    }

    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    function addMessageElement(el, options) {
        var $el = $(el);

        // Setup default options
        $messages.append($el);

        //$messages[0].scrollTop = $messages[0].scrollHeight;
    }

    function cleanInput(input) {
        return $('<div/>').text(input).text();


    }

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function(data) {
        addChatMessage(data);
    });


    function setUsername(username) {
        // If the username is valid
        if (username) {

            $currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('add user', username);
        }
    }

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function(data) {
        //log(data.username + ' joined');
        addParticipantsMessage(data);
    });


});