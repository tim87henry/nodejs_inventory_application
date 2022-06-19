var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema (
    {
        name: {type: String, required: true}
    }
);

// virtual URL for Genre
GenreSchema
.virtual('url')
.get(function() {
    return '/imdb/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);