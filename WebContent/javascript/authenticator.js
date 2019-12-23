/**
 * Module for authentication
 */

var Authenticator = function (serverModule) {

    var server = serverModule;

    //authentication for currently logged in user
    var authenticationToken = ko.observable();

    //callback for successful login
    var loginCallback;

    //user credentials
    var credential = {
        userName: ko.observable(),
        password: ko.observable()
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
        var token = server.login(credential.userName(), credential.password());
        authenticationToken(token);
        console.log("login :" + authenticationToken());
        loginCallback();
    };

    //method to set callback
    var setCallBack = function (callBack) {
        loginCallback = callBack;
    };
    //init function
    var init = function () {
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
        getAuthenticationToken: getAuthenticationToken,
        setCallBack: setCallBack,
        login: login
    };
};