'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;