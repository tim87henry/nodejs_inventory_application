var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NetworkSchema = new Schema(
    {
        name: {type: String, required: true},
        location: {type: String, required: true}
    }
)

// virtual URL for Network

NetworkSchema
.virtual('url')
.get(function() {
    return '/imdb/network/' + this._id;
});

module.exports = mongoose.model('Network', NetworkSchema);