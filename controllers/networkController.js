var Network = require('../models/network');

// not required
exports.network_list = function(req, res, next) {
    Network.find({})
    .sort({name: 1})
    .exec(function(err, network_list) {
        if (err) { return next(err)}
        res.render('network_list', {title: 'List of TV Networks', networks: network_list, error: err})
    })
}

// probably not required
exports.network_detail = function(req, res, next) {
    res.send('NOT DONE YET: Information about current Network');
}

//to do
exports.network_create_get = function(req, res, next) {
    res.send('NOT DONE YET: Network create get');
}

//to do
exports.network_create_post = function(req, res, next) {
    res.send('NOT DONE YET: Network create post');
}

//to do
exports.network_update_get = function(req, res, next) {
    res.send('NOT DONE YET: Network update get');
}

//to do
exports.network_update_post = function(req, res, next) {
    res.send('NOT DONE YET: Network update post');
}

//to do
exports.network_delete_get = function(req, res, next) {
    res.send('NOT DONE YET: Network delete get');
}

//to do
exports.network_delete_post = function(req, res, next) {
    res.send('NOT DONE YET: Network delete post');
}