'use strict';

myApp.controller('loginController', function ($scope, $http, $cookieStore, $timeout) {

    
    $timeout(function () {
        $scope.startApp=true;
    }, 900);

    // 1. Login:
    // Validate UserName
    $scope.loginValidUserNAme = false;
    // Login: Validate Password
    $scope.loginValidPassword = false;
    //Error finding of user from the server.
    $scope.loginFindValidUserNAme = false;

    //2. Register: 
    // Validate UserName
    $scope.regValidUserName = false;
    // Validate Email
    $scope.regValidUEmail = false;
    // Validate Password
    $scope.regValidPassword = false;

    //2. Reset: 
    // Validate Email
    $scope.resetEmptyUEmail = false;
    $scope.resetNotValidUEmail = false;
    $scope.resetFindValidUEmail = false;

    // Login -> SpringSecurity
    $scope.loginClick = function (loginForm, login) {

        if (loginForm.$valid && !angular.isUndefined(login)) {
            if (!angular.isUndefined(login.name) && !angular.isUndefined(login.password)) {
                if (login.name != '' && login.password != '') {
                    $http.post("/login", "username=" + login.name +
                        "&password=" + login.password + "&submit=Login", {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data) {
                        $cookieStore.put('session', data);
                        $('.cd-user-modal').removeClass('is-visible');
                        $timeout(function () {
                            $scope.login.name = '';
                            $scope.login.password = '';
                            $scope.login = undefined;
                        }, 1000);
                    }).error(function () {
                        $cookieStore.remove('session');
                        $scope.loginFindValidUserNAme = true;
                        $timeout(function () {
                            $scope.loginFindValidUserNAme = false;
                        }, 1500);
                    });
                }
                if (login.name == '') {
                    $scope.loginValidUserNAme = true;
                    $timeout(function () {
                        $scope.loginValidUserNAme = false;
                    }, 1500);
                }
                if (login.password == '') {
                    $scope.loginValidPassword = true;
                    $timeout(function () {
                        $scope.loginValidPassword = false;
                    }, 1500);
                }
            }
        }

        if (angular.isUndefined(login)) {
            $scope.loginValidUserNAme = true;
            $scope.loginValidPassword = true;
            $timeout(function () {
                $scope.loginValidUserNAme = false;
                $scope.loginValidPassword = false;
            }, 1500);
        }

        if (!angular.isUndefined(login)) {
            if (angular.isUndefined(login.name)) {
                $scope.loginValidUserNAme = true;
                $timeout(function () {
                    $scope.loginValidUserNAme = false;
                }, 1500);
            }
            if (angular.isUndefined(login.password)) {
                $scope.loginValidPassword = true;
                $timeout(function () {
                    $scope.loginValidPassword = false;
                }, 1500);
            }
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

    // Register -> SpringSecurity
    $scope.regClick = function (regForm, reg) {

        if (regForm.$valid && !angular.isUndefined(reg)) {
            if (!angular.isUndefined(reg.name)
                && !angular.isUndefined(reg.email)
                && !angular.isUndefined(reg.password)) {
                if (reg.email.contains('@')
                    && reg.name != ''
                    && reg.password != '') {
                    var account = {
                        name: reg.name,
                        password: reg.password,
                        email: reg.email
                    };
                    $http.post('/register', account).success(function (status) {
                        $('.cd-user-modal').removeClass('is-visible');
                        $timeout(function () {
                            $scope.reg.name = '';
                            $scope.reg.password = '';
                            $scope.reg.email = '';
                            $scope.reg = undefined;
                        }, 1200);
                    }).error(function (status) {
                        console.log("error код ответа: " + status);
                        // error 403
                    });
                }

                if (reg.name == '') {
                    $scope.regValidUserName = true;
                    $timeout(function () {
                        $scope.regValidUserName = false;
                    }, 1500);
                }
                if (reg.password == '') {
                    $scope.regValidPassword = true;
                    $timeout(function () {
                        $scope.regValidPassword = false;
                    }, 1500);
                }
                if (reg.email == '') {
                    $scope.regValidUEmail = true;
                    $timeout(function () {
                        $scope.regValidUEmail = false;
                    }, 1500);
                }
            }

        }

        if (angular.isUndefined(reg)) {
            $scope.regValidUserName = true;
            $scope.regValidUEmail = true;
            $scope.regValidPassword = true;
            $timeout(function () {
                $scope.regValidUserName = false;
                $scope.regValidUEmail = false;
                $scope.regValidPassword = false;
            }, 1500);
        }
        if (!angular.isUndefined(reg)) {

            if (angular.isUndefined(reg.name)) {
                $scope.regValidUserName = true;
                $timeout(function () {
                    $scope.regValidUserName = false;
                }, 1500);
            }
            if (angular.isUndefined(reg.email)) {
                $scope.regValidUEmail = true;
                $timeout(function () {
                    $scope.regValidUEmail = false;
                }, 1500);
            }
            if (angular.isUndefined(reg.password)) {
                $scope.regValidPassword = true;
                $timeout(function () {
                    $scope.regValidPassword = false;
                }, 1500);
            }
        }
    };

    // Restore -> SpringSecurity
    $scope.restClick = function (restoreForm, rest) {
        var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

        if (restoreForm.$valid && !angular.isUndefined(rest)) {

            if (!angular.isUndefined(rest.email)) {
                var isMatchRegex = EMAIL_REGEXP.test(rest.email);
                if (rest.email != '') {
                    if (isMatchRegex) {
                        var restore = {
                            email: rest.email
                        };
                        $http.post('/restore', restore).success(function (status) {
                            $('.cd-user-modal').removeClass('is-visible');
                            $scope.rest.email = '';
                            $scope.rest = undefined;
                        }).error(function () {
                            $scope.resetFindValidUEmail = true;
                            $timeout(function () {
                                $scope.resetFindValidUEmail = false;
                            }, 1500);
                        });
                    }else {
                        $scope.resetNotValidUEmail = true;
                        $timeout(function () {
                            $scope.resetNotValidUEmail = false;
                        }, 1500);
                    }
                }

            }

            if (rest.email == '') {
                $scope.resetEmptyUEmail = true;
                $timeout(function () {
                    $scope.resetEmptyUEmail = false;
                }, 1500);
            }
        } else {
            $scope.resetEmptyUEmail = true;
            $timeout(function () {
                $scope.resetEmptyUEmail = false;
            }, 1500);
        }

    };


});

myApp.controller('homeController', function ($scope, $http, $cookieStore) {

});

myApp.controller('patternsController', function ($scope, $http, $cookieStore) {

});

myApp.controller('aboutController', function ($scope, $http, $cookieStore) {

});
myApp.controller('patternsController', function ($scope, $http, $cookieStore, $timeout) {

    $scope.errorMessage = false;

    // Comment -> POST
    $scope.postComment = function (formCommentary, textareaCommentary) {
        if (formCommentary.$valid && $cookieStore.get('session') != null && !angular.isUndefined(textareaCommentary)) {
            if (textareaCommentary.text != '') {
                var comment = {
                    id_pattern: 123,
                    id_account: 22,
                    text: textareaCommentary.text
                };
                $http.post('/comment', comment).success(function () {
                    $scope.textareaCommentary.text = '';
                    $scope.textareaCommentary = undefined;
                }).error(function () {
                    alert("error send")
                });
            }
        }

        if (formCommentary.$valid && $cookieStore.get('session') == null) {
            $('.cd-signin').click();
        }

        if (formCommentary.$valid && $cookieStore.get('session') != null && angular.isUndefined(textareaCommentary)) {
            $scope.errorMessage = true;
            $timeout(function () {
                $scope.errorMessage = false;
            }, 1200);
        }
        if (formCommentary.$valid && $cookieStore.get('session') != null && !angular.isUndefined(textareaCommentary)) {
            if (textareaCommentary.text == '') {
                $scope.errorMessage = true;
                $timeout(function () {
                    $scope.errorMessage = false;
                }, 1200);
            }
        }
    };

});