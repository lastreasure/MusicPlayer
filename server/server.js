require('dotenv').config() // Establishing env variables - to keep sensitive data secure
// Create Express server 
const express = require('express');
// Mongoose for Data Object Modelling and DB connection
const mongoose = require('mongoose');
// Parse request bodies
const bodyParser = require('body-parser');
// Routing components
const songsRouter = require('./routes/songs');
const playlistsRouter = require('./routes/playlists');
const assetsRouter = require('./routes/assets');

// Name express server
const app = express();

// Create db connection 
// Passing Mongdb connection string via env variable
// Passing properties to prevent mongoose warnings
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
// Assigning db to mongoose connection
const db = mongoose.connection;

// Error handing
db.on('error', (error) => console.log(error));
// Signify that a successful connection to the database has been made
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

// Parsing json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Implementing routes
app.use(songsRouter);
app.use(playlistsRouter);
app.use(assetsRouter);

// Selecting port for server to listen on, console.log to signify that the server has started successfully
app.listen(5000, () => console.log('Server started'));