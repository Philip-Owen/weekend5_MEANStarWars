const mongoose = require('mongoose');

let favoritesSchema = new mongoose.Schema(
    {
        url: {type: String, required: true, unique: true},
        speciesInfo: {type: String, required: false},
        homeworldInfo: {type: String, required: false}
    }
);

let Favorite = mongoose.model('Favorite', favoritesSchema);

module.exports = Favorite;
