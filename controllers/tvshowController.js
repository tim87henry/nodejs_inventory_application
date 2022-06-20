var Tvshow = require('../models/tvshow');
var Genre = require('../models/genre');
var Network = require('../models/network');

var async = require('async');

exports.index = function(req, res, next) {
    Genre.find({})
    .sort({name: 1})
    .exec(function(err, genre_list) {
        if (err) { return next(err)}
        res.render('index', {title: 'TV Show database home', genres: genre_list, error: err})
    })
}

// not required
exports.tvshow_list = function(req, res) {
    res.send('NOT DONE YET: List of all TV shows');
}

exports.tvshow_detail = function(req, res, next) {
    Tvshow.findById(req.params.id)
    .populate('genre')
    .populate('network')
    .exec(function(err, tvshow) {
        if (err) { return next(err)}
        if (tvshow == null) {
            var err = new Error("TV show not found");
            err.status = 404;
            return next(err);
        }
        res.render('tvshow_detail', {tvshow: tvshow})
    });
}

//to do
exports.tvshow_create_get = function(req, res) {
    Genre.find({})
    .exec(function(err, genre_list) {
        if (err) { return next(err)}
        res.render('tvshow_form', {title: 'Add a TV show', genres: genre_list, error: err})
    })
}

//to do
exports.tvshow_create_post = function(req, res) {
    res.send('NOT DONE YET: TV show create post');
}

//to do
exports.tvshow_update_get = function(req, res) {
    res.send('NOT DONE YET: TV show update get');
}

//to do
exports.tvshow_update_post = function(req, res) {
    res.send('NOT DONE YET: TV show update post');
}

//to do
exports.tvshow_delete_get = function(req, res) {
    res.send('NOT DONE YET: TV show delete get');
}

//to do
exports.tvshow_delete_post = function(req, res) {
    res.send('NOT DONE YET: TV show delete post');
}