const express = require('express');
const router = express.Router();
const path = require("path")

router.get('/songImage/:image', async (req,res) => {
    // console.log("retrieving song image")
    try{
        res.sendFile(path.resolve(`./public/images/${req.params.image}`))
    } catch (err) {
        res.status(404).json({message: "Song image not found" + err.message }); // Image not Found
    }
})

router.get('/songAudio/:audio', async (req,res) => {
    // console.log("retrieving song audio")
    try{
        res.sendFile(path.resolve(`./public/songs/${req.params.audio}`))
    } catch (err) {
        res.status(404).json({message: err.message}); // Audio not found
    }
})

module.exports = router;


