const express = require('express');
const router = express.Router();
const Songs = require('../models/song');

// GET req - get all songs
router.get('/songs', async (req,res) => {
    try {
        // Await retrieval of songs from db and assign to allSongs variable
        const allSongs = await Songs.find();
        // For each song retrieve the image and song name and reassign with the entire URL
        allSongs.forEach((song) => {
            song.imageSource = `http://localhost:5000/songImage/${song.imageSource}`
            song.songSource = `http://localhost:5000/songAudio/${song.songSource}`
        })
        res.json(allSongs); // Send response
    } catch (err) {
        res.status(500).json({message: err.message}); // Server error
    }
})

// GET req - get specific songs by id
router.get('/songs/:id', async (req,res) => {
    try {
        // Await retrieval of song from db providing the req id and assign to allSongs variable
        const singleSongArr = await Songs.find({_id: req.params.id});
        const singleSong = singleSongArr[0];
        // For each song retrieve the image and song name and reassign with the entire URL
        singleSong.imageSource = `http://localhost:5000/songImage/${singleSong.imageSource}`
        singleSong.songSource = `http://localhost:5000/songAudio/${singleSong.songSource}`

        res.json(singleSong); // Send response
    
    } catch (err) {
        res.status(500).json({message: err.message}); // Server error
    }
})

// Post req - post a song
router.post('/songs', async (req,res) => {
    // Create new song object from the req body
    const newSong = new Songs({
        title: req.body.title,
        artist: req.body.artist,
        songSource: req.body.songSource,
        imageSource: req.body.imageSource
    })
    // Save this song object to the db    
    try {
        const newSongs = await newSong.save();
        res.status(201).json(newSongs); // Send response
    } catch (err) {
        res.status(400).json({message: err.message}); // Client error
    }
})

module.exports = router;