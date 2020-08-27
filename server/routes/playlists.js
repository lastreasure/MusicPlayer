const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

// GET req - get all playlists
router.get('/playlists', async (req,res) => {
    try {
        const allPlaylists = await Playlist.find();
        //
        allPlaylists.forEach((playlist) => {
            playlist.playlistSongId.forEach((id) => {
                playlist.playlistSongs.push(`http://localhost:5000/songs/${id}`)
                
            })
        })
        //
        res.json(allPlaylists);
    } catch (err) {
        res.status(500).json({message: err.message}); // Server error
    }
})

// GET req - get specific playlist by id
router.get('/playlists/:id', async (req,res) => {

    try {
        const singlePlaylistArr = await Playlist.find({_id: req.params.id});
        let singlePlaylist = singlePlaylistArr[0];
        //
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


// Create a playlist
router.post('/playlists', async (req,res) => {
    const newPlaylist = new Playlist({
        playlistName: req.body.playlistName,
        playlistSongId: req.body.playlistSongId,
    })
    console.log(req.body);
    try {
        const addPlaylists = await newPlaylist.save();
        res.status(201).json(addPlaylists);
    } catch (err) {
        res.status(400).json({message: err.message}); // Client error
    }
})


module.exports = router;



// singlePlaylist.playlistSongId.forEach( async (id) => {
//     await axios.get(`http://localhost:5000/songs/${id}`)
//     .then(songs =>  singlePlaylist.playlistSongs.push(songs))
//     .catch(function(err) {
//         console.log('fetch error' + err);
//     })
// })

// console.log(singlePlaylist.playlistSongs)

///////


        // allPlaylists.forEach((playlist) => {
        //     playlist.playlistSongId.forEach(async (id) => {
        //         console.log('this is the playlist id i hope: ' + id)
        //         await fetch(`http://localhost:5000/songs/${id}`)
        //         .then(res => res.json())
        //         .then(data => {
        //             playlist.playlistSongs.push(data)
        //             console.log("this is data " + data)
        //         })
        //         .catch(function(err) {
        //             console.log('fetch error' + err);
        //         })
        //     })
        // })



// allPlaylists.forEach((playlist) => {
//     playlist.playlistSongId.forEach((id) => {
//         console.log('this is the playlist id i hope: ' + id)
//         playlist.playlistSongs.push(`http://localhost:5000/songs/${id}`)
        
//     })
// console.log('this is the playlist ' + playlist)
// console.log('from playlists id playlist: ' + playlist.playlistSongId)
// })

