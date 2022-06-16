var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TvshowSchema = new Schema(
    {
        name: {type: String, required: true},
        desc: {type: String},
        genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: true},
        network: {type: Schema.Types.ObjectId, ref: 'Network', required: true},
        num_stock: {type: Number, required: true}
    }
)

// Virtual URL for Tvshow
TvshowSchema
.virtual('url')
.get(function() {
    return 'imdb/tvshow/' + this._id;
});

module.exports = mongoose.model('Tvshow', TvshowSchema);