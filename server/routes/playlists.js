const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

// GET req - get all playlists
router.get('/playlists', async (req,res) => {
    try {
        const allPlaylists = await Playlist.find();
        // For each playlist retrieve the song id and push to the playlistSongs array the Song URL
        allPlaylists.forEach((playlist) => {
            playlist.playlistSongId.forEach((id) => {
                playlist.playlistSongs.push(`http://localhost:5000/songs/${id}`)
                
            })
        })
        res.json(allPlaylists); // Send response
    } catch (err) {
        res.status(500).json({message: err.message}); // Server error
    }
})

// GET req - get specific playlist by id
router.get('/playlists/:id', async (req,res) => {

    try {
        const singlePlaylistArr = await Playlist.find({_id: req.params.id});
        let singlePlaylist = singlePlaylistArr[0];
        // Retrieve the song id and push to the playlistSongs array the Song URL
        singlePlaylist.playlistSongId.forEach(async (id) => {
            singlePlaylist.playlistSongs.push(`http://localhost:5000/songs/${id}`)
            singlePlaylist.playlistSongs.push(`http://localhost:5000/songs/${id}`)
        })
        //
        res.json(singlePlaylist);
    } catch (err) {
        res.status(500).json({message: err.message}); // Server error
    }
})

// Post req - create a playlist
router.post('/playlists', async (req,res) => {
    // Create playlist object from the req body
    const newPlaylist = new Playlist({
        playlistName: req.body.playlistName,
        playlistSongId: req.body.playlistSongId,
    })
    // Save this playlist object to the db
    try {
        const addPlaylists = await newPlaylist.save();
        res.status(201).json(addPlaylists);
    } catch (err) {
        res.status(400).json({message: err.message}); // Client error
    }
})

module.exports = router;

