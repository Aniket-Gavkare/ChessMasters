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

//handle player connection
io.on("connection", function(uniquesocket) {
    console.log("Connected");

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playrole","b");
    }
    else if(!players.black)
    {
        players.black = uniquesocket.id;
        uniquesocket.emit("playrole","b");
    }
    else{
        uniquesocket.emit("spectator");
    }

    //handle movement of pieces
    uniquesocket.on("move",(move)=>{
        try{
            //check if player turn is valid
            if(uniquesocket.id === players.white && chess.turn()!=="w") return;
            if(uniquesocket.id === players.black && chess.turn()!=="b") return;

            //try catch is for this
            const result = chess.move(move);

            if(result){
                currentPlayer = chess.turn();
                io.emit("move",move);
                io.emit("boardState",chess.fen());
            }
            else{
                console.log("invalid move" + move);
                uniquesocket.emit("invalidMove",move);      
            }
        }
        catch(err){
            console.log(err);
            uniquesocket.emit("invalidMove",move);
        }
    })

    uniquesocket.on("disconnect",()=>{
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        if(uniquesocket.id === players.black){
            delete players.black;
        }
    })
});


server.listen(3000,function(){
    console.log("page served");
});





