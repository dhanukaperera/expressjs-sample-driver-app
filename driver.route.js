'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const DriverModel = mongoose.model('Driver'),
    CommentModel = mongoose.model('Comment');

const Router = express.Router();

Router.get('/', (req, res) => {
    DriverModel.find().populate('comments').exec().then(drivers => {
        res.json(drivers);
        console.log(`GET : ${drivers}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    DriverModel.findById(req.params.id).populate('comments').exec().then(driver => {
        res.json(driver || {});
        console.log(`GET BY ID : ${driver}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const driver = new DriverModel(req.body);
    driver.save().then(driver => {
        res.json(driver);
        console.log(`POST : ${driver}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const driver = req.body;
    delete driver._id;
    const driverId = req.params.id;
    DriverModel.findByIdAndUpdate(driverId, {$set: driver}).then(driverDb => {
        res.json(driver);
        console.log(`PUT : ${driver}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    DriverModel.findByIdAndRemove(req.params.id).then((driver) => {
        const commentIds = driver.comments.map((commentId => commentId));
        return CommentModel.remove({_id: {$in: commentIds}});
    }).then(() => {
        res.sendStatus(200);
        console.log(`DELETE : ${driver}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/comments', (req, res) => {
    console.log(`POST COMMENT -> req : ${req.body}`);
    let comment = new CommentModel(req.body);
    const driverId = req.params.id;
    comment.driver = driverId;

    console.log(`POST COMMENT -> comment : ${comment}`);
    console.log(`POST COMMENT -> driverId : ${driverId}`);
    console.log(`POST COMMENT -> comment.driver : ${comment.driver}`);
    comment.save().then(commentDb => {
       // console.log(`POST COMMENT -> return 1 : ${DriverModel.findByIdAndUpdate(driverId, {$push: {"comments": commentDb._id}})}`);
        return DriverModel.findByIdAndUpdate(driverId, {$push: {"comments": commentDb._id}})
    }).then(() => {
       // console.log(`POST COMMENT -> return 2 : ${DriverModel.findById(driverId).populate('comments').exec();}`);
        return DriverModel.findById(driverId).populate('comments').exec();

    }).then(driverDb => {
        res.json(driverDb);
        console.log(`POST COMMENT : ${driverDb}`);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;