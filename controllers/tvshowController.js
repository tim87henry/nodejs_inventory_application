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

exports.tvshow_create_get = function(req, res, next) {
    
    async.parallel({
        genre_list: function(callback) {
            Genre.find({})
            .exec(callback)
        },
        network_list: function(callback) {
            Network.find({})
            .exec(callback)
        }
    }, function( err, results) {
            if (err) { return next(err)}
            res.render('tvshow_form', {title: 'Add a TV show', genres: results.genre_list, networks: results.network_list, error: err})
    });
}

exports.tvshow_create_post = function(req, res, next) {
    var tvshow = new Tvshow(
        {
            name: req.body.name,
            desc: req.body.desc,
            genre: req.body.genre,
            num_stock: req.body.num_stock,
            network: req.body.network
        }
    );
    tvshow.save(function(err) {
        if (err) { return next(err)}
        res.redirect(tvshow.url)
    });
}

//to do
exports.tvshow_update_get = function(req, res) {
    async.parallel({
        tvshow: function(callback) {
            Tvshow.findById(req.params.id)
            .populate('network')
            .populate('genre')
            .exec(callback)
        },
        genre_list: function(callback) {
            Genre.find({})
            .exec(callback)
        },
        network_list: function(callback) {
            Network.find({})
            .exec(callback)
        }
    }, function( err, results) {
            if (err) { return next(err)}
            res.render('tvshow_form', {title: 'Add a TV show', tvshow: results.tvshow, genres: results.genre_list, networks: results.network_list, error: err})
    });
}

//to do
exports.tvshow_update_post = function(req, res, next) {
    var tvshow = new Tvshow(
        {
            name: req.body.name,
            desc: req.body.desc,
            genre: req.body.genre,
            num_stock: req.body.num_stock,
            network: req.body.network,
            _id: req.params.id
        }
    );
    Tvshow.findByIdAndUpdate(req.params.id, tvshow, {}, function (err, show) {
        if (err) { return next(err)}
        res.redirect(tvshow.url);
    });
}

//to do
exports.tvshow_delete_get = function(req, res) {
    res.send('NOT DONE YET: TV show delete get');
}

//to do
exports.tvshow_delete_post = function(req, res) {
    res.send('NOT DONE YET: TV show delete post');
}