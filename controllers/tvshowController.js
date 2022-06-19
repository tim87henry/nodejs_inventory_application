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

exports.tvshow_list = function(req, res) {
    res.send('NOT DONE YET: List of all TV shows');
}

exports.tvshow_detail = function(req, res, next) {
    async.parallel({
        tvshow: function(callback) {
            Tvshow.findById(req.params.id)
            .exec(callback)
        },
        genre: function(callback) {
            var show = Tvshow.findById(req.params.id);
            var genre_id = show.genre;
            console.log("IT's "+genre_id)
            Genre.findById(genre_id)
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err)}
        if (results.tvshow == null) {
            var err = new Error("TV show not found");
            err.status = 404;
            return next(err);
        }
        res.render('tvshow_detail', {tvshow: results.tvshow, genre: results.genre})
    });
}

exports.tvshow_create_get = function(req, res) {
    res.send('NOT DONE YET: TV show create get');
}

exports.tvshow_create_post = function(req, res) {
    res.send('NOT DONE YET: TV show create post');
}

exports.tvshow_update_get = function(req, res) {
    res.send('NOT DONE YET: TV show update get');
}

exports.tvshow_update_post = function(req, res) {
    res.send('NOT DONE YET: TV show update post');
}

exports.tvshow_delete_get = function(req, res) {
    res.send('NOT DONE YET: TV show delete get');
}

exports.tvshow_delete_post = function(req, res) {
    res.send('NOT DONE YET: TV show delete post');
}