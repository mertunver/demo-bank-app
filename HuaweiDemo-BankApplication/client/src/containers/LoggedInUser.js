var LoggedInUser = (function() {
    var tcNo = "";
    var username = "";
    var password = "";
    var balance =0;
    var isLoggedIn =false;

    var getBalance = function() {
        return balance;
    };

    var setBalance = function(balanceOfUser) {
        balance = balanceOfUser;
    };


    var getPassword = function() {
        return password;
    };

    var setPassword = function(pass) {
        password = pass;
    };

    var getIsLoggedIn = function() {
        return isLoggedIn;
    };

    var setIsLoggedIn = function(loginStatus) {
        isLoggedIn = loginStatus;
    };

    var getName = function() {
        return username;
    };

    var setName = function(name) {
        username = name;
    };

    var getTcNo = function() {
        return tcNo;
    };

    var setTcNo = function(no) {
        tcNo = no;
    };



    return {
        getName: getName,
        setName: setName,
        getTcNo : getTcNo,
        setTcNo: setTcNo,
        getIsLoggedIn: getIsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        getBalance:getBalance,
        setBalance:setBalance,
        getPassword:getPassword,
        setPassword:setPassword
    }

})();

export default LoggedInUser;