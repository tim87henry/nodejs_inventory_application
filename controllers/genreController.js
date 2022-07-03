var Genre = require('../models/genre');
var Tvshows = require('../models/tvshow')
var async = require('async');


// done via index, in tvshow controller
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
        res.render('genre_detail', {title: results.genre.name, genre: results.genre, genre_tvshows: results.genre_tvshows})
    });
}

exports.genre_create_get = function(req, res, next) {
    res.render('genre_form', {title: 'Add a Genre'})
}

exports.genre_create_post = function(req, res, next) {
    var genre = new Genre(
        {
            name: req.body.name
        }
    );
    genre.save(function(err) {
        if (err) { return next(err)}
        res.redirect(genre.url)
    });
}

exports.genre_update_get_auth = function(req, res, next) {
    res.render('authentication_form', {title: 'Add a Genre'})
}

exports.genre_update_post_auth = function(req, res, next) {
    if (req.body.cancel === 'cancel') {
        Genre.findById(req.params.id)
        .exec(function(err, genre) {
        if (err) { return next(err)}
        if (genre == null) {
            var err = new Error("Genre not found");
            err.status = 404;
            return next(err);
        }
        res.redirect(genre.url)
    });
    } else if (req.body.submit === 'submit') {
        if (req.body.username === 'admin' && req.body.password === 'nimda') {
            res.redirect('/imdb/genre/'+req.params.id+'/update')
        } else {
            Genre.findById(req.params.id)
            .exec(function(err, genre) {
                if (err) { return next(err)}
                if (genre == null) {
                    var err = new Error("Genre not found");
                    err.status = 404;
                    return next(err);
                }
                res.render('authentication_failure', {url: genre.url});
            });
        }
    }
}

exports.genre_update_get = function(req, res, next) {
    Genre.findById(req.params.id)
    .exec(function(err, genre) {
        if(err) { return next(err)}
        res.render('genre_form',{title: 'Edit Genre', genre: genre});
    })
}

exports.genre_update_post = function(req, res, next) {
    var genre = new Genre(
        {
            name: req.body.name,
            _id: req.params.id
        }
    );
    Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err, updatedgenre) {
        if (err) { return next(err)}
        res.redirect(updatedgenre.url);
    });
}

exports.genre_delete_get = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback)
        },
        tvshows: function(callback) {
            Tvshows.find({genre: req.params.id})
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err)}
        res.render('genre_delete', {title:'Delete Genre', genre: results.genre, tvshows: results.tvshows})
    });
}

exports.genre_delete_post = function(req, res, next) {
    if (req.body.cancel === 'cancel') {
        Genre.findById(req.params.id)
        .exec(function(err, genre) {
        if (err) { return next(err)}
        if (genre == null) {
            var err = new Error("Genre not found");
            err.status = 404;
            return next(err);
        }
        res.redirect(genre.url)
    });
    } else if (req.body.delete === 'delete') {
        Genre.findByIdAndRemove(req.params.id, function(err) {
            if (err) { return next(err)}
            res.redirect("/");
        })
    }
}