'use strict';

angular.module('DriverApp').controller('CommentsController', ['$scope', '$routeParams', 'DriverService',
    function ($scope, $routeParams, DriverService) {

        function getDriver() {
            // $scope.driver = DriverService.getById($routeParams.id);
            DriverService.getById($routeParams.id).then(driver => {
                $scope.driver = driver;
            });
        }

        getDriver();

        $scope.addComment = (id, comment) => {
            DriverService.addComment(id, comment).then((driver) => {
                $scope.driver = driver;
                comment.text = '';
            });
            // getDriver();
        };
    }]);