'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 9005;
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const connection = connect();
const cookieParser = require('cookie-parser');
const authenticationMiddleware = require('./middleware/authentication');



const app = express();

app.set('port', PORT);


const corsOpts = {
    origin: [
        'http://localhost:8081',
        'http://localhost:8080'
    ],
    credentials: true
  };

app.use(cors(corsOpts));
app.use(cookieParser());
app.use(authenticationMiddleware);

app.use(express.json());

//require('./middleware/swagger-setup')(app);
require('./middleware/express-router')(app);

let server = http.createServer(app);


connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);


function listen() {
    //    console.log(process.env.NODE_ENV,"process.env.NODE_ENV");

    server.listen(PORT);
    console.log('Express app started on port ' + PORT);

}

function connect() {

    const dbConfig = require('./config/db');
    const options = { keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true };
    const uri =  dbConfig.db.uri;

    mongoose.connect(uri, options).catch((err) => {
        return console.log(err, "Mongo Error")
    });
    return mongoose.connection;

}

server.on('error', onError);
server.on('listening', onListening);

//Port error handler.
function onError(error) {
    switch (error.code) {
        case 'EADDRINUSE':
            console.log('Port:', PORT, 'is already in  use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/// error handlers

//server connection message
function onListening() {
    console.log('Express server listening on port ', server.address().port, " with pid ", process.pid);
}


module.exports = app;