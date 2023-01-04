var express = require ("express")
var app = express()
var http = require("http").createServer(app)
var socketIO = require("socket.io")(http, {
    cors:   {
        origin: "*"
    }
});

http.listen(3000, function(){
    console.log("server started");
    socketIO.on("connection",function(socket){
        console.log("user connected : " + socket.id)
    });
});