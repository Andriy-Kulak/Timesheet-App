const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors'); //used to make sure you don't have a 'cors' error
const MongoClient = require('mongodb').MongoClient;

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined')); // morgan is for logging
app.use(cors());
app.use(bodyParser.json({type: '*/*'})); // used to parse incoming requests into json //
router(app); // now our router will have access to our app

// Server Setup
const port = process.env.PORT || 3090; // port setup
const server = http.createServer(app); // will be adding func. to our app over time
server.listen(port);
console.log('Server listening on:', port);
