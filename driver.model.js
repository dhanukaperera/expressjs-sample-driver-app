'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    ranking: {
        type: Number,
        unique: true,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;