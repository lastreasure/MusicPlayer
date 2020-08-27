require('dotenv').config() //establishing env variables 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const songsRouter = require('./routes/songs');
const playlistsRouter = require('./routes/playlists');
const assetsRouter = require('./routes/assets');


// Create db connection 
// Passing mongdb connection string 
// Passing properties to prevent mongoose warnings
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Prevent CORS issues and allow client access to API 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTION") {
        // res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, UPDATE');
        res.header('Access-Control-Allow-Methods', '*');
        return res.statusCode(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(songsRouter);
app.use(playlistsRouter);
app.use(assetsRouter);


app.listen(5000, () => console.log('Server started'));

