'use strict';

myApp.controller('loginController', function ($scope, $http, $cookieStore) {

    // Login -> SpringSecurity
    $scope.loginClick = function (loginForm, login) {
        if (loginForm.$valid) {
            $http.post("/login", "username=" + login.name +
                "&password=" + login.password + "&submit=Login", {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $cookieStore.put('session', data);
            }).error(function () {
                $cookieStore.remove('session');
            });
        }
    };

    // Logout
    $scope.logoutClick = function () {
        $cookieStore.remove('session');
        $http.post("/login", "username=flash&password=flash&submit=Login", {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

    };

    // is login
    $scope.isLogin = function () {
        return $cookieStore.get('session') == null;
    };

    // Logout -> SpringSecurity
    $scope.regClick = function (regForm, reg) {
        if (regForm.$valid) {
            var account = {
                name: reg.name,
                password: reg.password,
                email: reg.email
            };            
            $http.post('/register', account).success(function (status) {
                console.log("success код ответа: " + status);
            }).error(function (status) {
                console.log("error код ответа: " + status);
            });
        }
    };


});
