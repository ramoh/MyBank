/**
 * Module for authentication
 */

var Authenticator = function (serverModule) {

    var server = serverModule;

    //authentication for currently logged in user
    var authenticationToken = ko.observable();

    //callback for successful login
    var loginCallback;

    //flag to show authentication has failed
    var showAuthenticationFailed = ko.observable(false);

    //user credentials
    var credential = {
        userName: ko.observable().extend({required: true}),
        password: ko.observable().extend({required: true})
    };

    //authentications token
    var getAuthenticationToken = function () {
        return authenticationToken();
    };

    //return true if user is authenticated otherwise false
    var isAuthenticated = ko.pureComputed(function () {
        return authenticationToken() !== false;
    });

    var login = function () {
        //check for validations
        if (credential.errors().length > 0) {
            console.log("Credential model in invalid");
            credential.errors.showAllMessages();
            return;
        }
        var token = server.login(credential.userName(), credential.password());
        if (token == false) {
            showAuthenticationFailed(true);
            return;

        }
        authenticationToken(token);
        console.log("login :" + authenticationToken());
        loginCallback();
    };

    //method to set callback
    var setCallBack = function (callBack) {
        loginCallback = callBack;
    };

    var loggedInUser = ko.pureComputed(function () {
        var token = authenticationToken();
        var split = token.split("\.");
        var userPayload = JSON.parse(jwt.base64urldecode(split[1]));
        return userPayload.userName;
    });

    var logout = function () {
        server.logout(authenticationToken());
        sessionStorage.clear();
        document.location.reload(true);
    };
    //init function
    var init = function () {
        //initialize errors
        credential.errors = ko.validation.group(credential);
        var token = sessionStorage.getItem("token");
        if (token == null) {
            authenticationToken(false);
        } else {
            authenticationToken(token);
        }
    }();


    return {
        isAuthenticated: isAuthenticated,
        credential: credential,
        showAuthenticationFailed: showAuthenticationFailed,
        loggedInUser: loggedInUser,
        getAuthenticationToken: getAuthenticationToken,
        setCallBack: setCallBack,
        login: login,
        logout: logout
    };
};