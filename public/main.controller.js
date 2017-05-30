'use strict';

angular.module('DriverApp').controller('MainController', ['$scope', 'DriverService',
    function ($scope, DriverService) {

        function getDrivers() {
            // $scope.drivers = DriverService.get();
            DriverService.get().then(drivers => {
                $scope.drivers = drivers;
            })
        }

        getDrivers();

        $scope.addDriver = (driver) => {
            DriverService.add(driver).then(() => {
                getDrivers();
                driver = {};
            });
        };
    }]);