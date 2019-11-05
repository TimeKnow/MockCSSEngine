
const homeUrl = 'https://cgisdev.utcluj.ro/moodle/chat-piu/';
const API = {
    register: homeUrl + 'authenticate.php',
    logout: homeUrl + 'logout.php'
};

var initialSize = {
    width: "40px",
    height: "40px",

};

var headerExpandedSize = {
    width: '350px',
    height: '40px'
};

var windowSizeExpanded = {
    width: '350px',
    height: '470px',

};

var stageDuration = 500; // milliseconds
var click = "click";

var userDisplayName = '';
var sessionToken = '';
var userId = '';


$(document).ready(function (){

    // Initialize elements
    $('#chatWindow').hide();
    $('#processingAuth').hide();
    $('#authText').hide();
    $('#closeChat').hide();

    // bind actions to elements
    $('#open').on(click, expandChat);
    $('#closeChat').on(click, hideChatWindow);
    $('#authButton').on(click, authenticate);
    $('#logout').on(click, logOut);

});


function expandChat(){
    console.log("Expanding button...");
    $('#authWindow').animate(headerExpandedSize, stageDuration, expandChatWindow);

}

function expandChatWindow(){

    $('#authWindow').animate(windowSizeExpanded, stageDuration, null);
    $('#authText').show();
    $('#closeChat').show();
}

function hideChatWindow(){
    $('#authWindow').animate(headerExpandedSize, stageDuration, hideChatHeader);

}


function hideChatHeader(){
    $('#authWindow').animate(initialSize, stageDuration, null);

}

function authenticate(){

    $('#processingAuth').show();
    verifyCredentials();
    return false;

}


function verifyCredentials(){

    const username = $('#username').val();
    const password = $('#password').val();

    var userDTO = {
        username: username,
        password: password
    };

    $.ajax({
        url: API.register,
        type: 'POST',
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(userDTO),
        success: function(data){
            initializeChatWindow(data);
            $('#processingAuth').hide();
        },
        error: function(){
            displayLoginFailed();
            $('#processingAuth').hide();
        }
    });

    return false;
}

function initializeChatWindow(data){

    sessionToken = data.token;
    userDisplayName = data.display;

    $('#userDisplayName').html(userDisplayName);

    displayChatWindow();

}

function displayLoginFailed(){
    $('#authHeader').html("Authentication failed").addClass("alertText");
}

function displayChatWindow(){
    $('#chatFormDiv').hide();
    $('#chatWindow').show();
}

function logOut(){

    console.log('Logging out...');
    console.log('Session token: ' + sessionToken);

    $.ajax({
        url: API.logout,
        type: 'DELETE',
        dataType:"json",
        contentType: "application/json",

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${sessionToken}`);
        },

        success: function(){

            $('#chatWindow').hide();

            $('#username').val('');
            $('#password').val('');
            $('#authHeader').html("Authentication is required");
            $('#chatFormDiv').show(500);
        },
        error: function(){

        }
    });


}


