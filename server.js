'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./driver.model.js');
require('./comment.model');

const DriverRouter = require('./driver.route');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/driverProfile', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app', express.static(__dirname + '/public'));
app.use('/app/modules', express.static(__dirname + '/bower_components'));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/drivers', DriverRouter);

app.get('/app/*', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});