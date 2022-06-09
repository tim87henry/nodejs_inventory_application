#! /usr/bin/env node

console.log('This script populates some test TV shows, networks and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Tvshow = require('./models/tvshow')
var Network = require('./models/network')
var Genre = require('./models/genre')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tvshows = []
var genres = []
var networks = []

function networkCreate(name, location, cb) {
  networkdetail = {name:name , location: location }
    
  var network = new Network(networkdetail);
       
  network.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Network: ' + network);
    networks.push(network)
    cb(null, network)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function tvshowCreate(name, desc, num_stock, network, genre, cb) {
  tvshowdetail = { 
    name: name,
    desc: desc,
    network: network,
    num_stock: num_stock
  }
  if (genre != false) tvshowdetail.genre = genre
    
  var tvshow = new Tvshow(tvshowdetail);    
  tvshow.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New TV Show: ' + tvshow);
    tvshows.push(tvshow)
    cb(null, tvshow)
  }  );
}


function createGenreNetworks(cb) {
    async.series([
        function(callback) {
          networkCreate('NBC Corporation', 'New York', callback);
        },
        function(callback) {
          networkCreate('CBS Broadcasting', 'New York', callback);
        },
        function(callback) {
          networkCreate('ABC American Broadcasting Company', 'New York', callback);
        },
        function(callback) {
          genreCreate("Sitcom", callback);
        },
        function(callback) {
          genreCreate("Crime", callback);
        },
        function(callback) {
          genreCreate("Drama", callback);
        },
        ],
        // optional callback
        cb);
}


function createTvshows(cb) {
    async.parallel([
        function(callback) {
          tvshowCreate('Friends', 'Follow the lives of six reckless adults living in Manhattan, as they indulge in adventures which make their lives both troublesome and happening.', '12', networks[1], [genres[0],], callback);
        },
        function(callback) {
          tvshowCreate("Cheers", 'A group of people from different paths of life meet at Cheers, a bar run by Sam in Boston, and share their experiences while working and drinking at the bar.', '7', networks[0], [genres[0],], callback);
        },
        function(callback) {
          tvshowCreate("Breaking Bad", 'Walter White, a chemistry teacher, discovers that he has cancer and decides to get into the meth-making business to repay his medical debts. His priorities begin to change when he partners with Jesse.', '10', networks[2], [genres[1],], callback);
        },
        function(callback) {
          tvshowCreate("Squid Game", "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.", '4', networks[2], [genres[2],], callback);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createGenreNetworks,
    createTvshows
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

