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

router.get('/', (req,res) => {
    Favorite.find({}, (err, favorites) => {
        if (err) {
            console.log('error on get favorites', err);
            res.sendStatus(500);
        } else {
            console.log('found favorites', favorites);
            res.send(favorites);
        }
    })
});

router.delete('/:id', (req,res) => {
    let favId = req.params.id;
    Favorite.findByIdAndRemove({'_id': favId }, (err, removedFav) => {
        if (err) {
            console.log('error on removedFav', err);
            res.sendStatus(500);
        } else {
            console.log('found removedFav', removedFav);
            res.sendStatus(200);
        }
    })
});

module.exports = router;