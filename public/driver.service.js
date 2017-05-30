'use strict';

angular.module('DriverApp').factory('DriverService', ['$http',
    function ($http) {
        const drivers = [{
            _id: 34627343243,
            firstName: 'John',
            lastName: 'Smith',
            birthday: '2000-10-01',
            vehicle: 'Nissan-GTR',
            ranking: 1,
            comments: [{text: 'Good Driver'}, {text: 'Best Driver'}]
        }, {
            _id: 67657546465,
            firstName: 'Mike',
            lastName: 'Black',
            birthday: '2002-06-12',
            vehicle: 'Merc SLK 500',
            ranking: 2,
            comments: [{text: 'Best Driver'}]
        }];

        // return {
        //     get: () => drivers,
        //     add: driver => {
        //         driver._id = Date.now();
        //         drivers.push(driver);
        //     },
        //     getById: id => {
        //         return drivers.find(driver => driver._id === parseInt(id));
        //     },
        //     addComment: (id, comment) => {
        //         const driver = drivers.find(driver => driver._id === parseInt(id));
        //         driver.comments.push({text: comment.text});
        //     }
        // };

        return {
            get: () => $http.get('/drivers').then(response => response.data),
            add: driver => $http.post('/drivers', driver).then(response => response.data),
            getById: id => $http.get('/drivers/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/drivers/' + id + '/comments', comment).then(response => response.data),
        };
    }]);