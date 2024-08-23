// importing essentials
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const { Chess } = require ('chess.js');

//path to serve static files
const path = require('path');

//express instance
const app = express();

//socket instance using http server based on node instance
const server = http.createServer(app);
const io = socket(server);

//chess instance
const chess = new Chess();

//stores w/b with it's id as socket_id
const players = {};
const currentPlayer = 'W';

// set the view engine to ejs
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.render('index');
});

io.on("connection", function(uniquesocket) {
    console.log("connected");
  });

server.listen(3000,function(){
    console.log("page served");
});



