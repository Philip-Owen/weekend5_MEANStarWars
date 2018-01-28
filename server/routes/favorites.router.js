const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


let favoritesSchema = new mongoose.Schema(
    {
        url: {type: String, required: true, unique: true},
        speciesInfo: {type: String, required: false},
        homeworldInfo: {type: String, required: false}
    }
);

let Favorite = mongoose.model('Favorite', favoritesSchema);


// POST route
router.post('/', (req,res)=> {
    let favoriteToAdd = new Favorite(req.body);

    favoriteToAdd.save((err, savedFavorite)=> {
        if(err) {
            console.log('error on saving favorite', err);
            res.sendStatus(500);
        } else {
            console.log('new saved favorite', savedFavorite);
            res.sendStatus(201);
        }
    })
});

module.exports = router;