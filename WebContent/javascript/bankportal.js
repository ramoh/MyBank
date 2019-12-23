/* Module for customer banking portal */
var BankPortal = function () {


    var server = ServerStub();
    var authenticator = Authenticator(server);
    /* Model for fund transfer */
    var transfer = {
        toAccount: ko.observable(),
        fromAccount: ko.observable(),
        amount: ko.observable(),
        description: ko.observable()
    };
    var member = {
        personal: {
            firstName: ko.mementoObservable().extend({required: true}),
            lastName: ko.mementoObservable().extend({required: true}),
            address: {
                street: ko.mementoObservable().extend({required: true}),
                city: ko.mementoObservable().extend({required: true}),
                postCode: ko.mementoObservable().extend({required: true}),
                country: ko.mementoObservable().extend({required: true})
            },
            contactDetails: {
                phoneNumber: ko.mementoObservable().extend({required: true}),
                emailAddress: ko.mementoObservable().extend({required: true}),
            }
        },
        accounts: ko.observableArray(),
        selectedAccount: ko.observable(),
        selectedAccountTransactions: ko.observableArray()
    };

    //edit mode for personal information
    var personalInformationEditMode = ko.observable(false);
    var showPersonalInformationEditDone = ko.observable(false);
    var showPersonalInformationEditCancel = ko.observable(false);
    var validationErrors;
    var transferWizard = Wizards(3);
    var enablePersonalInformationEdit = function () {
        personalInformationEditMode(true);
        showPersonalInformationEditDone(false);
        showPersonalInformationEditCancel(false);
    };

    var submitPersonalInformation = function () {

        if (validationErrors().length > 0) {
            console.log("Member model is invalidvalid ....");
            return;
        }
        commitPersonalInformation();
        console.log("Updating personal information on the server :" + ko.toJSON(member.personal));
        server.updatePersonalInformation(ko.toJS(member.personal),authenticator.getAuthenticationToken());
        console.log("Personal information updated on the server");
        personalInformationEditMode(false);
        showPersonalInformationEditDone(true);
    };

    var cancelPersonalInformationEdit = function () {
        personalInformationEditMode(false);
        resetPersonalInformation();
        showPersonalInformationEditCancel(true);
    };

    var commitPersonalInformation = function () {
        member.personal.firstName.commit();
        member.personal.lastName.commit();
        member.personal.contactDetails.phoneNumber.commit();
        member.personal.contactDetails.emailAddress.commit();
        member.personal.address.street.commit();
        member.personal.address.city.commit();
        member.personal.address.postCode.commit();
        member.personal.address.country.commit();

    };

    var resetPersonalInformation = function () {
        console.log("resetting personal information");
        member.personal.firstName.reset();
        member.personal.lastName.reset();
        member.personal.contactDetails.phoneNumber.reset();
        member.personal.contactDetails.emailAddress.reset();
        member.personal.address.street.reset();
        member.personal.address.city.reset();
        member.personal.address.postCode.reset();
        member.personal.address.country.reset();

    };


    //retireves data from the server side and sets it to the model
    var retrieveData = function () {
        console.log("Retrieving data from server ....");
        var data = server.getMemberData(authenticator.getAuthenticationToken());
        console.log("Data retrieved from server :" + ko.toJSON(data));

        //add accounts to model
        data.accounts.forEach(function (account) {
            member.accounts.push({
                summary: account.summary,
                transactions: ko.observableArray(account.transactions)
            });
        });
        //add personal information to the model
        member.personal.firstName(data.personal.firstName);
        member.personal.lastName(data.personal.lastName);
        member.personal.contactDetails.phoneNumber(data.personal.phoneNumber);
        member.personal.contactDetails.emailAddress(data.personal.emailAddress);

        member.personal.address.street(data.personal.address.street);
        member.personal.address.city(data.personal.address.city);
        member.personal.address.postCode(data.personal.address.postCode);
        member.personal.address.country(data.personal.address.country);

        commitPersonalInformation();
    };

    //Attribute to hold the active page
    var activePage = ko.observable("Home");
    //Attribute to hold the active tab
    var activeTab = ko.observable("Accounts");

    //method to set the active tab
    var setActiveTab = function (tab) {
        console.log("Setting the active tab to :" + tab);
        activeTab(tab);
    };

    //return true if parameter matches
    var isActiveTab = function (tab) {
        return activeTab() === tab;
    };

    //method to set the active page
    var setActivePage = function (page) {
        console.log("Setting the active page to :" + page);
        activePage(page);
    };

    //returns true if parameter matches active page or false otherwise
    var isActivePage = function (page) {
        return activePage() === page;
    };

    //set selected account
    var setSelectedAccount = function (account) {
        console.log("Setting selected account :" + account.summary.number);
        member.selectedAccount(account);
        member.selectedAccountTransactions(account.transactions());
    };

    var isSelectedAccount = function (account) {
        return account === member.selectedAccount();
    };

    //call back for when authentication is successful
    var postAuthenticationInit = function () {

        if (authenticator.isAuthenticated()) {
            retrieveData();
            validationErrors = ko.validation.group(member, {deep: true});
        }
    };

    /* method to initialize the module*/
    var init = function () {
        authenticator.setCallBack(postAuthenticationInit);
        //apply binding
        ko.applyBindings(BankPortal);
        //inti with data if user is already authenticated
        postAuthenticationInit();
    };


    $(init);
    return {
        member: member,
        personalInformationEditMode: personalInformationEditMode,
        showPersonalInformationEditDone: showPersonalInformationEditDone,
        showPersonalInformationEditCancel: showPersonalInformationEditCancel,
        transferWizard: transferWizard,
        authenticator: authenticator,
        setActivePage: setActivePage,
        isActivePage: isActivePage,
        setActiveTab: setActiveTab,
        isActiveTab: isActiveTab,
        setSelectedAccount: setSelectedAccount,
        isSelectedAccount: isSelectedAccount,
        enablePersonalInformationEdit: enablePersonalInformationEdit,
        cancelPersonalInformationEdit: cancelPersonalInformationEdit,
        submitPersonalInformation: submitPersonalInformation

    };
}();