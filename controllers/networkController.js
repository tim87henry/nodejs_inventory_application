var Network = require('../models/network');

exports.network_list = function(req, res, next) {
    Network.find({})
    .sort({name: 1})
    .exec(function(err, network_list) {
        if (err) { return next(err)}
        res.render('network_list', {title: 'List of TV Networks', networks: network_list, error: err})
    })
}

exports.network_detail = function(req, res, next) {
    Network.findById(req.params.id)
    .exec(function(err, network) {
        if(err) { return next(err)}
        res.render('network_detail',{title: network.name, network: network});
    })
}

exports.network_create_get = function(req, res, next) {
    res.render('network_form', {title: 'Add a Network'})
}

exports.network_create_post = function(req, res, next) {
    var network = new Network(
        {
            name: req.body.name,
            location: req.body.location
        }
    );
    network.save(function(err) {
        if (err) { return next(err)}
        res.redirect(network.url)
    })
}

exports.network_update_get = function(req, res, next) {
    Network.findById(req.params.id)
    .exec(function(err, network) {
        if(err) { return next(err)}
        res.render('network_form',{title: 'Edit Network', network: network});
    })
}

exports.network_update_post = function(req, res, next) {
    var network = new Network(
        {
            name: req.body.name,
            location: req.body.location,
            _id: req.params.id
        }
    );
    Network.findByIdAndUpdate(req.params.id, network, {}, function (err, updatednetwork) {
        if (err) { return next(err)}
        res.redirect(updatednetwork.url);
    });
}

exports.network_delete_get = function(req, res, next) {
    Network.findById(req.params.id)
    .exec(function(err, network) {
        if(err) { return next(err)}
        res.render('network_delete',{title: 'Delete Network', network: network});
    })
}

exports.network_delete_post = function(req, res, next) {
    if (req.body.cancel === 'cancel') {
        Network.findById(req.params.id)
        .exec(function(err, network) {
        if (err) { return next(err)}
        if (network == null) {
            var err = new Error("Network not found");
            err.status = 404;
            return next(err);
        }
        res.redirect(network.url)
    });
    } else if (req.body.delete === 'delete') {
        Network.findByIdAndRemove(req.params.id, function(err) {
            if (err) { return next(err)}
            res.redirect("/imdb/networks");
        })
    }
}