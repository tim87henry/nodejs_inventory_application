var Genre = require('../models/genre');
var Tvshows = require('../models/tvshow')
var async = require('async');

exports.genre_list = function(req, res) {
    res.send('NOT DONE YET: List of all Genres');
}

exports.genre_detail = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback)
        },
        genre_tvshows: function(callback) {
            Tvshows.find({genre: req.params.id})
            .exec(callback)
        }
    }, function(err, results) {
        if(err) { return next(err)}
        if(results.genre==null) {
            var err = new Error("Genre not found");
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', {title: results.genre.name, genre_tvshows: results.genre_tvshows})
    });
}

exports.genre_create_get = function(req, res) {
    res.send('NOT DONE YET: Genre create get');
}

exports.genre_create_post = function(req, res) {
    res.send('NOT DONE YET: Genre create post');
}

exports.genre_update_get = function(req, res) {
    res.send('NOT DONE YET: Genre update get');
}

exports.genre_update_post = function(req, res) {
    res.send('NOT DONE YET: Genre update post');
}

exports.genre_delete_get = function(req, res) {
    res.send('NOT DONE YET: Genre delete get');
}

exports.genre_delete_post = function(req, res) {
    res.send('NOT DONE YET: Genre delete post');
}