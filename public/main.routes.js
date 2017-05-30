'use strict';

angular.module('DriverApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'driver.list.html',
            controller: 'MainController'
        }).when('/comments/:id', {
            templateUrl: 'comments.list.html',
            controller: 'CommentsController'
        }).otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);
    }]);