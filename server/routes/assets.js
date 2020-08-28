const express = require('express');
const router = express.Router();
const path = require("path")

// GET req - get song image from public folder
router.get('/songImage/:image', async (req,res) => {
    try{
        res.sendFile(path.resolve(`./public/images/${req.params.image}`)) 
    } catch (err) {
        res.status(404).json({message: "Song image not found" + err.message }); // Image not Found
    }
})

// GET req - get song audio from public folder
router.get('/songAudio/:audio', async (req,res) => {
    try{
        res.sendFile(path.resolve(`./public/songs/${req.params.audio}`))
    } catch (err) {
        res.status(404).json({message: err.message}); // Audio not found
    }
})

module.exports = router;


