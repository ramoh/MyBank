/* Copyright (c) Adnan Jaswal, 2015. See the file license.txt for copying permission. */
/* Module for server stub */
var ServerStub = function () {

    var users = [
        {userName: "john.citizen", password: "john123", firstName: "John", lastName: "Citizen"},
        {userName: "mark.person", password: "mark123", firstName: "Mark", lastName: "Person"},
        {userName: "rajesh.mohanty", password: "welcome1", firstName: "Rajesh", lastName: "Mohanty"}
    ];

    var tokenHeader = {typ: "JWT", alg: "HS256"};
    var hmacKey = "hmackey";

    /* months for date string */
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    /* add members here */
    var memberData = [
        {
            userName: "john.citizen",
            data: {
                personal: {
                    firstName: "John", lastName: "Citizen",
                    address: {street: "1 Main Street", city: "Melbourne", postCode: 3000, country: "Australia"},
                    phoneNumber: 399998888, emailAddress: "john.citizen@email.com"
                },
                accounts: [
                    {
                        summary: {branch: "Collingwood", number: "0612 30042", type: "Savings", balance: 700},
                        transactions: [{
                            date: "20 May",
                            description: "Collingwood milk bar",
                            category: "Grocery",
                            amount: 23
                        },
                            {date: "18 May", description: "Food store", category: "Food", amount: 13},
                            {date: "15 April", description: "Collingwood milk bar", category: "Grocery", amount: 53},
                            {date: "12 March", description: "Sushi shop", category: "Food", amount: 28}]
                    },
                    {
                        summary: {branch: "Clayton", number: "0652 20172", type: "Savings", balance: 313.64},
                        transactions: [{
                            date: "21 May",
                            description: "Clayton milk bar",
                            category: "Grocery",
                            amount: 63
                        },
                            {date: "19 May", description: "No 8 Southbank", category: "Food", amount: 450},
                            {date: "13 April", description: "State library", category: "Work", amount: 53},
                            {date: "11 March", description: "Bags for sale", category: "Shopping", amount: 78}]
                    },
                    {
                        summary: {branch: "Mitcham", number: "0682 40742", type: "Credit", balance: 60000},
                        transactions: [{
                            date: "23 June",
                            description: "Black coder coffee",
                            category: "Food",
                            amount: 53
                        },
                            {date: "21 May", description: "Food store", category: "Grocery", amount: 63},
                            {date: "13 April", description: "Money transfer", category: "Transfer", amount: 500},
                            {date: "09 March", description: "Sushi shop", category: "Food", amount: 68},
                            {date: "08 March", description: "Donuts", category: "Food", amount: 50}]
                    },
                    {
                        summary: {branch: "Doncaster", number: "0612 40772", type: "Cheque", balance: 10000},
                        transactions: []
                    }
                ]
            }
        },
        {
            userName: "mark.person",
            data: {
                personal: {
                    firstName: "Mark", lastName: "Person",
                    address: {street: "1 Main Street", city: "Melbourne", postCode: 3000, country: "Australia"},
                    phoneNumber: 399998888, emailAddress: "mark.dude@email.com"
                },
                accounts: [
                    {
                        summary: {branch: "Collingwood", number: "0616 31042", type: "Savings", balance: 700},
                        transactions: [{
                            date: "20 May",
                            description: "Collingwood milk bar",
                            category: "Grocery",
                            amount: 23
                        },
                            {date: "18 May", description: "Food store", category: "Food", amount: 13},
                            {date: "15 April", description: "Collingwood milk bar", category: "Grocery", amount: 53},
                            {date: "12 March", description: "Sushi shop", category: "Food", amount: 28}]
                    },
                    {
                        summary: {branch: "Clayton", number: "0652 25172", type: "Savings", balance: 313.64},
                        transactions: [{
                            date: "21 May",
                            description: "Clayton milk bar",
                            category: "Grocery",
                            amount: 63
                        },
                            {date: "19 May", description: "No 8 Southbank", category: "Food", amount: 450},
                            {date: "13 April", description: "State library", category: "Work", amount: 53},
                            {date: "11 March", description: "Bags for sale", category: "Shopping", amount: 78}]
                    },
                    {
                        summary: {branch: "Mitcham", number: "0612 70742", type: "Credit", balance: 60000},
                        transactions: [{
                            date: "23 June",
                            description: "Black coder coffee",
                            category: "Food",
                            amount: 53
                        },
                            {date: "21 May", description: "Food store", category: "Grocery", amount: 63},
                            {date: "13 April", description: "Money transfer", category: "Transfer", amount: 500},
                            {date: "09 March", description: "Sushi shop", category: "Food", amount: 68},
                            {date: "08 March", description: "Donuts", category: "Food", amount: 50}]
                    },
                    {
                        summary: {branch: "Doncaster", number: "0612 63772", type: "Cheque", balance: 10000},
                        transactions: [{
                            date: "21 June",
                            description: "Black coder coffee on the run",
                            category: "Food",
                            amount: 53
                        }]
                    }
                ]
            }
        }

    ];

    /* method returns member data */
    var getMemberData = function (clientToken) {
        var userName = validateToken(clientToken);
        for (var i = 0; i < memberData.length; i++) {
            if (memberData[i].userName == userName) {
                return memberData[i].data;
            }
        }

        return null;
    };

    var getAccounts = function (clientToken) {
        var userName = validateToken(clientToken);
        for (var i = 0; i < memberData.length; i++) {
            if (memberData[i].userName == userName) {
                return memberData[i].data.accounts;
            }
        }

        return null;
    };

    var getTodaysDate = function () {
        var date = new Date();
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day
        }
        var monthIndex = date.getMonth();
        return day + ' ' + monthNames[monthIndex];
    };

    var transferFunds = function (transferModel, clientToken) {
        var userName = validateToken(clientToken);

        var accounts = null
        for (var i = 0; i < memberData.length; i++) {
            if (memberData[i].userName == userName) {
                accounts = memberData[i].data.accounts;
                break;
            }
        }

        //convert string to number
        transferModel.amount = +transferModel.amount;

        accounts.forEach(function (account) {
            if (account.summary.number == transferModel.toAccount.summary.number) {
                account.summary.balance = account.summary.balance + transferModel.amount;
                account.transactions.push({
                    date: getTodaysDate(),
                    description: transferModel.description,
                    category: "Credit",
                    amount: transferModel.amount
                });
            }

            if (account.summary.number == transferModel.fromAccount.summary.number) {
                account.summary.balance = account.summary.balance - transferModel.amount;
                account.transactions.push({
                    date: getTodaysDate(),
                    description: transferModel.description,
                    category: "Debit",
                    amount: transferModel.amount
                });
            }
        });
    };

    /* method to update personal information */
    var updatePersonalInformation = function (personalInformation, clientToken) {
        var userName = validateToken(clientToken);

        var member = null;
        for (var i = 0; i < memberData.length; i++) {
            if (memberData[i].userName == userName) {
                member = memberData[i].data;
                break;
            }
        }

        member.personal.firstName = personalInformation.firstName;
        member.personal.lastName = personalInformation.lastName;
        member.personal.phoneNumber = personalInformation.contactDetails.phoneNumber;
        member.personal.emailAddress = personalInformation.contactDetails.emailAddress;

        member.personal.address.street = personalInformation.address.street;
        member.personal.address.city = personalInformation.address.city;
        member.personal.address.postCode = personalInformation.address.postCode;
        member.personal.address.country = personalInformation.address.country;
    };

    var login = function (userName, password) {
        console.log("Logging in using: " + userName);
        var token = false;
        for (var i = 0; i < users.length; i++) {

            if (users[i].userName == userName && users[i].password == password) {
                token = constuctToken(users[i]);
                break;
            }
        }

        return token;
    };

    var logout = function (clientToken) {
        //logout
    };

    var constuctToken = function (user) {
        var date = new Date();
        var payload = {
            iss: "mybank", exp: date.getTime(), sub: "authentication token",
            firstName: user.firstName, lastName: user.lastName, userName: user.userName
        };

        var token = new jwt.WebToken(JSON.stringify(payload), JSON.stringify(tokenHeader));
        var signed = token.serialize(hmacKey);
        return signed;
    };

    var validateToken = function (clientToken) {
        var token = jwt.WebTokenParser.parse(clientToken);
        if (token.verify(hmacKey)) {
            console.log(jwt.base64urldecode(token.payloadSegment));
            var payload = JSON.parse(jwt.base64urldecode(token.payloadSegment));
            return payload.userName;
        } else {
            return false;
        }
    };

    return {
        /* add members that will be exposed publicly */
        getMemberData: getMemberData,
        updatePersonalInformation: updatePersonalInformation,
        transferFunds: transferFunds,
        getAccounts: getAccounts,
        login: login,
        logout: logout
    };
};